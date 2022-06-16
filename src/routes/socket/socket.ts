import {Router} from 'express';
import {Server} from 'socket.io';

import * as Routers from '@/routes';

import {loginMiddleware} from '@/middlewares';

export const socket = (io: Server) => {
  const socket = Router();

  socket.use('/message', loginMiddleware.validateToken, Routers.message(io));
  socket.use('/room', loginMiddleware.validateToken, Routers.room(io));

  return socket;
};
