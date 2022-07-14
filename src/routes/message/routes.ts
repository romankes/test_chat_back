import {Router} from 'express';
import {Server} from 'socket.io';

import {messageController} from '@/controllers';
import {validate} from '@/helpers';
import {messageSchema} from '@/validations';

export const messageRoutes = (io: Server) => {
  const messageRoutes = Router();

  messageRoutes.post(
    '/',
    // validate(messageSchema.createSchema),
    messageController.create(io),
  );
  messageRoutes.delete(
    '/:id',
    validate(messageSchema.removeSchema),
    messageController.remove(io),
  );
  // roomRoutes.delete('/', userController.remove);

  // auth.post('/signIp', authControllers.signUp);
  return messageRoutes;
};
