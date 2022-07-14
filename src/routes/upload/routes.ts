import {uploadController} from '@/controllers';
import {Router} from 'express';

const uploadRoutes = Router();

uploadRoutes.get('/users/:filename', uploadController.users);
uploadRoutes.get('/rooms/:filename', uploadController.rooms);
uploadRoutes.get('/messages/:filename', uploadController.messages);

export {uploadRoutes};
