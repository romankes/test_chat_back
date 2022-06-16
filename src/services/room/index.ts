import {sendPush} from '@/helpers/sendPush';
import {db} from '@/models';
import {Server} from 'socket.io';
import {RoomService} from './types';

export const createItem = async (
  data: RoomService.CreateItem,
  io: Server,
): Promise<RoomService.ResCreateItem | null> => {
  const usersData = await db.user.findUsers(data.users);

  if (usersData.length === data.users.length) {
    const room = await db.room.create(data);

    const users = await Promise.all(
      usersData.map(async (user) => {
        const obj = JSON.parse(JSON.stringify(user));

        await db.user.updateRooms(user._id, [room._id]);

        delete obj['socket_id'];

        return obj;
      }),
    );

    await Promise.all(
      usersData.map(async (user) => {
        if (user.socket_id && user._id.toString() !== room.admin.toString()) {
          io.to(user.socket_id).emit('CREATE_ROOM', {
            ...room,
            users,
          });
        }

        if (user._id.toString() !== data.admin && user.deviceToken) {
          await sendPush(
            user.deviceToken,
            {
              title: room.title,
              body: 'Chat was created',
            },
            {
              action: 'CREATE_ROOM',
              roomId: room._id.toString(),
            },
          );
        }
      }),
    );

    return {
      ...room,
      users,
    };
  }

  return null;
};

export const removeRoom = async (
  roomId: string,
  currentUser: string,
  io: Server,
): Promise<string> => {
  const room = await db.room.getDetail(roomId);
  const users = await db.room.getUsersByItem(roomId);

  const isAdmin = room.admin === currentUser;

  users.forEach((user) => {
    if (user.socket_id && user.socket_io !== currentUser) {
      io.to(user.socket_io).emit(isAdmin ? 'REMOVE_ROOM' : 'LEAVE_ROOM', {
        id: roomId,
        userId: currentUser,
      });
    }
  });

  const {command} = await db.room.leave(roomId, currentUser);

  if (isAdmin || command === 'remove') {
    await db.message.removeItemsByRoomId(roomId);
    await db.room.remove(roomId);

    await Promise.all(
      users.map(async ({_id}) => {
        await db.user.leaveRoom(roomId, _id);
      }),
    );
  } else {
    await db.user.leaveRoom(roomId, currentUser);
  }

  return roomId;
};

export const getDetail = async (
  roomId: string,
  userId: string,
): Promise<RoomService.ResGetDetail> => {
  const room = await db.room.getDetail(roomId);
  const messages = await db.message.getItemsByRoom(roomId);

  await db.notReadMessage.read(userId, roomId);

  return {
    room: room.toJSON(),
    messages,
  };
};

export const getItems = async (
  page: number = 1,
  per: number = 10,
  userId: string,
): Promise<RoomService.ResGetItems> => {
  const {rooms, totalPage} = await db.room.getItems(page, per, userId);

  const fullRooms = await Promise.all(
    rooms.map(async (room: any) => {
      const message = await db.message.getLastItemByRoom(room._id);

      const notRead = await db.notReadMessage.getItemsByRoom(room._id, userId);

      return {
        ...room,
        message,
        notReadCount: notRead.length,
      };
    }),
  );

  return {
    rooms: fullRooms.sort((cur, next) => {
      return (
        new Date(next.message?.createdAt || next.createdAt).getMilliseconds() -
        new Date(cur.message?.createdAt || cur.createdAt).getMilliseconds()
      );
    }),
    totalPage,
  };
};
