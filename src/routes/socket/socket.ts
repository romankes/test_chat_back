import {Router} from 'express';
import {Server} from 'socket.io';

import * as Routers from '@/routes';

export const socket = (io: Server) => {
  const socket = Router();

  // console.log(io.sockets);

  socket.use('/message', Routers.message(io));
  socket.use('/room', Routers.room(io));

  // chat.get('/online', userControllers.getOnlineUsers);
  // user.delete('/', userControllers.removeUser);
  // user.put('/', userControllers.updateUser);
  // user.patch('/', userControllers.updateUser);

  return socket;
};
