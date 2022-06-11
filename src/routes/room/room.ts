import {roomController} from '@/controllers';
import {Response, Router} from 'express';
import {Server} from 'socket.io';

export const room = (io: Server) => {
  const room = Router();

  // console.log(io.sockets);

  room.post('/', (req, res) => roomController.createRoom(req, res, io));
  room.get('/', roomController.getRooms);
  room.get('/:id', roomController.getRoom);
  room.delete('/:id', (req, res) => roomController.removeRoom(req, res, io));
  // chat.get('/online', userControllers.getOnlineUsers);
  // user.put('/', userControllers.updateUser);
  // user.patch('/', userControllers.updateUser);

  return room;
};
