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

    const users = usersData.map((user) => {
      const obj = JSON.parse(JSON.stringify(user));

      delete obj['socket_id'];

      return obj;
    });

    usersData.forEach((user) => {
      if (user.socket_id && user.socket_id !== room.admin) {
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
  const users: any[] = await db.room.getAllUsersByRoom(roomId);

  users.forEach((user) => {
    if (user.socket_id && user.socket_io !== currentUser) {
      io.to(user.socket_io).emit('remove_room', {id: roomId});
    }
  });

  await db.message.removeAllByRoomId(roomId);
  await db.room.removeRoom(roomId);

  return roomId;
};

export const getRoomDetail = async (roomId: string) => {
  const room = await db.room.getRoom(roomId);
  const messages = await db.message.getMessagesByRoom(roomId);

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

      return {
        ...room,
        message,
      };
    }),
  );

  return {
    rooms: fullRooms,
    totalPage,
  };
};
