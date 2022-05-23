import {Router} from 'express';
import {userControllers} from '@/controllers';

const user = Router();

user.get('/', userControllers.getUser);
user.get('/online', userControllers.getOnlineUsers);
// user.delete('/', userControllers.removeUser);
// user.put('/', userControllers.updateUser);
// user.patch('/', userControllers.updateUser);

export {user};
