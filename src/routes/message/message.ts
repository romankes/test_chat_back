import {messageController} from '@/controllers';
import {CurrentUser} from '@/types';
import {Router, Request, Response} from 'express';
import {Server} from 'socket.io';

export const message = (io: Server) => {
  const message = Router();

  message.post('/', (req, res: Response<{}, CurrentUser>) =>
    messageController.createItem(req, res, io),
  );
  message.delete('/:id', (req, res: Response<{}, CurrentUser>) =>
    messageController.removeItem(req, res, io),
  );

  return message;
};
