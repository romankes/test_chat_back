import {roomController} from '@/controllers';
import {Router} from 'express';
import {Server} from 'socket.io';

export const room = (io: Server) => {
  const room = Router();

  // console.log(io.sockets);

  room.post('/', (req, res: any) => roomController.createRoom(req, res, io));
  room.get('/', roomController.getRooms);
  room.get('/:id', roomController.getRoom);
  // chat.get('/online', userControllers.getOnlineUsers);
  // user.delete('/', userControllers.removeUser);
  // user.put('/', userControllers.updateUser);
  // user.patch('/', userControllers.updateUser);

  return room;
};
