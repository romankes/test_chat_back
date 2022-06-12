import {db} from '@/models';
import {Server} from 'socket.io';
import {TCreateRoom, TResCreateRoom, TResGetRooms} from './types';

export const createRoom = async (
  data: TCreateRoom,
  io: Server,
): Promise<TResCreateRoom> => {
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

    usersData.forEach((user) => {
      if (user.socket_id && user._id.toString() !== room.admin.toString()) {
        io.to(user.socket_id).emit('create_room', {
          ...room,
          users,
        });
      }
    });

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
  const room = await db.room.getRoom(roomId);
  const users = await db.room.getAllUsersByRoom(roomId);

  const isAdmin = room.admin === currentUser;

  users.forEach((user) => {
    if (user.socket_id && user.socket_io !== currentUser) {
      io.to(user.socket_io).emit(isAdmin ? 'remove_room' : 'leave_room', {
        id: roomId,
      });
    }
  });

  if (isAdmin) {
    await db.message.removeAllByRoomId(roomId);
    await db.room.removeRoom(roomId);

    await Promise.all(
      users.map(async ({_id}) => {
        await db.user.removeRoom(roomId, _id);
      }),
    );
  } else {
    await db.room.leaveRoom(roomId, currentUser);
    await db.user.removeRoom(roomId, currentUser);
  }

  return roomId;
};

export const getRoomDetail = async (roomId: string, userId: string) => {
  const room = await db.room.getRoom(roomId);
  const messages = await db.message.getMessagesByRoom(roomId);

  await db.notReadMessage.read(userId, roomId);

  return {
    room: room.toJSON(),
    messages,
  };
};

export const getRooms = async (
  page: number = 1,
  per: number = 10,
  userId: string,
): Promise<TResGetRooms> => {
  const {rooms, totalPage} = await db.room.getRooms(page, per, userId);

  const fullRooms = await Promise.all(
    rooms.map(async (room: any) => {
      const message = await db.message.getLastMessageByRoom(room._id);

      const notRead = await db.notReadMessage.getAllItemByRoom(
        room._id,
        userId,
      );

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
