import {Router} from 'express';
import {Server} from 'socket.io';

import * as Routers from '@/routes';

import {loginMiddleware} from '@/middlewares';

export const socket = (io: Server) => {
  const socket = Router();

  // console.log(io.sockets);

  socket.use('/message', loginMiddleware.validateToken, Routers.message(io));
  socket.use('/room', loginMiddleware.validateToken, Routers.room(io));

  // chat.get('/online', userControllers.getOnlineUsers);
  // user.delete('/', userControllers.removeUser);
  // user.put('/', userControllers.updateUser);
  // user.patch('/', userControllers.updateUser);

  return socket;
};
