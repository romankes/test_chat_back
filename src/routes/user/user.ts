import {Router} from 'express';
import {userControllers} from '@/controllers';

import multer from 'multer';

import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/users/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({dest: 'uploads/', storage});

const user = Router();

user.get('/', userControllers.getUser);
user.get('/online', userControllers.getOnlineUsers);
// user.delete('/', userControllers.removeUser);
user.put('/', upload.single('avatar'), userControllers.updateUser);
user.patch('/', upload.single('avatar'), userControllers.updateUser);

export {user};
