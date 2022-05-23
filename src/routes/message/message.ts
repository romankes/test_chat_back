import {Router, Request, Response} from 'express';
import {Server} from 'socket.io';

export const message = (io: Server) => {
  const message = Router();

  // console.log(io.sockets);

  // chat.get('/', userControllers.getUser);
  // chat.get('/online', userControllers.getOnlineUsers);
  // user.delete('/', userControllers.removeUser);
  // user.put('/', userControllers.updateUser);
  // user.patch('/', userControllers.updateUser);

  return message;
};
