import {messageController} from '@/controllers';
import {Router, Request, Response} from 'express';
import {Server} from 'socket.io';

export const message = (io: Server) => {
  const message = Router();

  // console.log(io.sockets);

  message.post('/', (req, res: any) =>
    messageController.createMessage(req, res, io),
  );
  // chat.get('/online', userControllers.getOnlineUsers);
  // user.delete('/', userControllers.removeUser);
  // user.put('/', userControllers.updateUser);
  // user.patch('/', userControllers.updateUser);

  return message;
};
