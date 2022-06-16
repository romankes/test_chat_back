import {Router} from 'express';
import {userControllers} from '@/controllers';

import multer from 'multer';

import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/users/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({dest: 'uploads/', storage});

const user = Router();

user.get('/', userControllers.getDetail);
user.get('/all', userControllers.getUsers);
user.put('/deviceToken', userControllers.updateDeviceToken);
user.patch('/deviceToken', userControllers.updateDeviceToken);

user.put('/', upload.single('avatar'), userControllers.updateItem);
user.patch('/', upload.single('avatar'), userControllers.updateItem);

export {user};
