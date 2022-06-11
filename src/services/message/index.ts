import {db} from '@/models';
import {Server} from 'socket.io';
import {TCreateMessageData} from './types';

export const createMessage = async (
  data: TCreateMessageData,
  io: Server,
): Promise<any> => {
  const isExist = await db.room.exists(data.room);
  if (isExist) {
    const message = await db.message.create(data);

    const users = await db.room.getAllUsersByRoom(data.room);

    users.forEach(({_id, socket_id}) => {
      if (socket_id && _id !== data.user) {
        io.to(socket_id).emit('create_meesage', message);
      }
    });

    return message;
  }

  return null;
};
