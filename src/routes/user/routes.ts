import {Router} from 'express';
import {userController} from '@/controllers';
import {userSchema} from '@/validations';
import {validate} from '@/helpers';
import {Server} from 'socket.io';

export const userRoutes = (io: Server) => {
  const userRoutes = Router();

  userRoutes.get('/info', userController.userInfo);
  userRoutes.get('/', validate(userSchema.listSchema), userController.list);
  userRoutes.delete('/', userController.remove(io));
  userRoutes.patch('/', userController.update);

  return userRoutes;
};
