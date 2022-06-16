import {roomController} from '@/controllers';
import {Response, Router} from 'express';
import {Server} from 'socket.io';

import multer from 'multer';

import path from 'path';
import {CurrentUser} from '@/types';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/rooms/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({dest: 'uploads/', storage});

export const room = (io: Server) => {
  const room = Router();

  room.post(
    '/',
    upload.single('avatar'),
    (req, res: Response<{}, CurrentUser>) =>
      roomController.createItem(req, res, io),
  );
  room.get('/', roomController.getItems);
  room.get('/:id', roomController.getDetail);
  room.delete('/:id', (req, res: Response<{}, CurrentUser>) =>
    roomController.removeItem(req, res, io),
  );

  return room;
};
