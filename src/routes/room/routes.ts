import {Router} from 'express';
import {roomController} from '@/controllers';
import {roomSchema} from '@/validations';
import {Server} from 'socket.io';
import {validate} from '@/helpers';

export const roomRoutes = (io: Server) => {
  const roomRoutes = Router();

  roomRoutes.post(
    '/',
    validate(roomSchema.createSchema),
    roomController.create(io),
  );
  roomRoutes.get('/', validate(roomSchema.listSchema), roomController.list);
  roomRoutes.get('/:id', validate(roomSchema.showSchema), roomController.show);
  roomRoutes.delete('/:id', roomController.remove(io));

  // auth.post('/signIp', authControllers.signUp);
  return roomRoutes;
};
