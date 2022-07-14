import {
  TCratePayload,
  TListPayload,
  TListReturn,
  TRemoveParams,
  TShowParams,
  TShowReturn,
} from './types';

import logger from 'jet-logger';
import {
  MessageModel,
  RoomModel,
  TMessage,
  TRoom,
  TUser,
  UserModel,
} from '@/models';
import {App, Room} from '@/types';
import {broadcast, extractUsers, sendPush} from '@/helpers';
import {messageBuilders, roomBuilders} from '@/builders';

export const create = async ({
  data,
  io,
  currentUser,
}: TCratePayload): Promise<Room.ListBuilder | null> => {
  try {
    const docs = await UserModel.find({_id: data.room.users});

    if (docs.length) {
      const doc = await RoomModel.create({
        title: data.room.title,
        users: [...data.room.users, data.room.admin],
        admin: data.room.admin,
        avatar: data.room?.avatar || '',
      });

      await UserModel.updateMany(
        {_id: data.room.users},
        {$push: {rooms: doc._id}},
      );

      const users = docs.filter((doc) => !doc._id.equals(`${currentUser}`));

      const room = roomBuilders.listBuilder(
        (await (await doc.populate('users')).toJSON()) as TRoom<TUser>,
      );

      broadcast(
        io,
        users.map(({socketId}) => socketId),
        {
          event: 'CREATE_ROOM',
          data: room,
        },
      );

      Promise.all(
        users.map(
          ({deviceToken}) =>
            deviceToken &&
            sendPush(
              deviceToken,
              {
                title: room.title,
                body: 'Chat was created',
              },
              {
                action: 'CREATE_ROOM',
                roomId: room._id.toString(),
              },
            ),
        ),
      );

      return room;
    }

    return null;
  } catch (e) {
    logger.err(`Create room ${e}`);
  }
};

export const list = async ({
  page,
  per,
  initiator,
  title,
}: TListPayload): Promise<TListReturn | null> => {
  try {
    const docs = await RoomModel.find(
      {
        users: initiator,

        title: {$regex: title, $options: 'i'},
      },
      {},
      {skip: (page - 1) * per, limit: per},
    ).populate('users');

    const totalCount = await RoomModel.countDocuments({users: initiator});

    const rooms = await Promise.all(
      docs.map(async (doc) => {
        const message = await MessageModel.findOne({room: doc._id}, '-room', {
          sort: {createdAt: -1},
        }).populate('user');

        const notReadCount = await MessageModel.countDocuments({
          room: doc._id,
          notRead: initiator,
        });

        return {
          ...roomBuilders.listBuilder({
            ...(doc.toJSON() as TRoom<TUser>),
            notReadCount,
          }),
          message:
            message &&
            messageBuilders.listBuilder(message.toJSON() as TMessage<TUser>),
        };
      }),
    );

    return {
      rooms: rooms.sort(
        (curr, next) =>
          new Date(next?.message?.updatedAt || next.updatedAt).getTime() -
          new Date(curr?.message?.updatedAt || curr.updatedAt).getTime(),
      ),
      totalCount,
    };
  } catch (e) {
    logger.err(`List room ${e}`);

    return null;
  }
};

export const show = async ({
  id,
  initiator,
}: TShowParams): Promise<TShowReturn | null> => {
  try {
    const doc = await RoomModel.findOne({_id: id, users: initiator}).populate(
      'users',
    );
    if (doc) {
      const messages = await MessageModel.find({room: id}, '-room', {
        sort: {createdAt: -1},
      }).populate('user');

      await UserModel.findByIdAndUpdate(initiator, {currentRoom: id});

      await MessageModel.updateMany(
        {room: doc._id, notRead: initiator},
        {$pull: {notRead: initiator}},
      );

      return {
        ...roomBuilders.showBuilder(doc.toJSON() as TRoom<TUser>),
        messages:
          messages?.map((message) =>
            messageBuilders.listBuilder(message.toJSON() as TMessage<TUser>),
          ) || [],
      };
    }

    return null;
  } catch (e) {
    logger.err(`Show room ${e}`);

    return null;
  }
};

export const remove = async ({
  id,
  initiator,
  io,
}: TRemoveParams): Promise<any> => {
  try {
    const room = await RoomModel.findOne({_id: id, admin: initiator}).populate(
      'users',
    );

    if (room) {
      await MessageModel.deleteMany({room: room._id});
      await UserModel.updateMany({_id: room.users}, {$pull: {users: room._id}});

      const {socketIds, deviceTokens} = extractUsers({
        users: room.users as unknown as TUser[],
        initiator,
      });

      //TODO: refactor

      broadcast(io, socketIds, {
        event: 'REMOVE_ROOM',
        data: {
          room: room._id,
        },
      });

      await Promise.all(
        deviceTokens.map(
          async (deviceToken) =>
            deviceToken &&
            (await sendPush(
              deviceToken,
              {
                title: `${room.title} remove`,
                body: '',
              },
              {action: 'REMOVE_ROOM', room: room._id},
            )),
        ),
      );

      await room.delete();

      return room;
    } else {
      const room = (await RoomModel.findOneAndUpdate(
        {_id: id, users: initiator},
        {$pull: {users: initiator}},
      ).populate('users')) as TRoom<TUser>;

      if (room) {
        const users = room.users.filter((item) => item._id !== initiator);

        if (users.length < 2) {
          //TODO: REFACTOR
          const users = room.users.filter(
            (item) => (item._id as any) !== initiator,
          ) as unknown as TUser[];

          broadcast(
            io,
            users.map(({socketId}) => socketId),
            {
              event: 'REMOVE_ROOM',
              data: {
                room: room._id,
              },
            },
          );
        } else {
          broadcast(
            io,
            users.map(({socketId}) => socketId),
            {
              event: 'LEAVE_USER',
              data: {
                room: room._id,
                userId: initiator,
              },
            },
          );

          await Promise.all(
            users.map(
              async ({deviceToken}) =>
                deviceToken &&
                (await sendPush(
                  deviceToken,
                  {
                    title: `User leave from ${room.title}`,
                    body: '',
                  },
                  {action: 'LEAVE_USER', room: room._id},
                )),
            ),
          );
        }
      }
      return room;
    }
  } catch (e) {
    logger.err(`Remove room service ${e}`);
  }

  return null;
};
