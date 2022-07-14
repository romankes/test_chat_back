import {
  TCreatePayload,
  TListReturn,
  TRemoveParams,
  TRemoveReturn,
  TUpdateParams,
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
import {messageBuilders} from '@/builders';
import {broadcast, extractUsers, sendPush} from '@/helpers';

export const create = async ({
  data,
  io,
}: TCreatePayload): Promise<TListReturn | null> => {
  try {
    const roomDoc = await RoomModel.findOne({
      _id: data.roomId,
      users: data.userId,
    }).populate('users');

    if (roomDoc) {
      const room = roomDoc.toJSON() as TRoom<TUser>;

      const {deviceTokens, socketIds, ids} = extractUsers({
        users: room.users as TUser[],
        initiator: data.userId,
      });

      const usersInRoom = await await UserModel.find({currentRoom: room._id});

      const notRead = room.users
        .filter(
          (user) =>
            usersInRoom.findIndex(({_id}) => `${_id}` === `${user._id}`) === -1,
        )
        .map(({_id}) => _id);

      const doc = await MessageModel.create({
        room: data.roomId,
        text: data.text,
        user: data.userId,
        image: data.image,
        notRead,
      });

      const message = messageBuilders.listBuilder(
        (await (await doc.populate('user')).toJSON()) as TMessage<TUser>,
      );

      broadcast(io, socketIds, {event: 'CREATE_MESSAGE', data: message});

      Promise.all(
        deviceTokens.map(
          (deviceToken) =>
            deviceToken &&
            sendPush(
              deviceToken,
              {
                title: room.title,
                body: message.text,
              },
              {
                action: 'CREATE_MESSAGE',
                roomId: room._id.toString(),
              },
            ),
        ),
      );

      return message;
    }
  } catch (e) {
    logger.err(`Create message service ${e} `);
  }

  return null;
};

export const remove = async ({
  id,
  io,
}: TRemoveParams): Promise<TRemoveReturn | null> => {
  try {
    const message = await MessageModel.findByIdAndRemove(id).populate('user');

    if (!message) {
      return null;
    }

    const room = (await RoomModel.findById(message.room).populate(
      'users',
      'socketId',
    )) as TRoom<TUser>;

    if (!room) {
      return null;
    }

    const {deviceTokens, socketIds} = extractUsers({
      users: room.users,
      initiator: message.user,
    });

    broadcast(io, socketIds, {
      event: 'REMOVE_MESSAGE',
      data: {
        room: room._id,
        id: message._id,
      },
    });

    return messageBuilders.listBuilder(message.toJSON() as TMessage<TUser>);
  } catch (e) {
    logger.err(`Remove message service ${e} `);
  }

  return null;
};

export const update = async ({
  data,
  id,
  initiator,
  io,
}: TUpdateParams): Promise<any> => {
  try {
    const doc = await MessageModel.findOneAndUpdate(
      {_id: id, user: initiator},
      data,
    ).populate('user');

    if (doc) {
      const message = messageBuilders.listBuilder(
        doc.toJSON() as TMessage<TUser>,
      );
      const room = await RoomModel.findById(doc.room).populate('users');

      return message;
    }
  } catch (e) {
    logger.err(`Update message service ${e} `);
  }

  return null;
};
