import {Request, Response} from 'express';
import {NUserModel, UserModel} from '@/models';
import {User} from './namespace';

import multer from 'multer';

export const getUser = (
  req: Request,
  res: Response<User.GetUserRes, {user: NUserModel.Item}>,
) => {
  try {
    const {user} = res.locals;

    if (user) {
      res.send({user});
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    console.log(`get user action ${e}`);
    res.sendStatus(422);
  }
};
export const getOnlineUsers = () => {};

export const updateUser = async (
  req: Request<{}, {}, User.UpdateUserBody>,
  res: Response<{}, {user: NUserModel.Item}>,
) => {
  const {username = ''} = req.body;

  const {user} = res.locals;

  await UserModel.findByIdAndUpdate(user._id, {
    username,
    avatar: req.file.path.replace(/^\/\//g, '/'),
  });

  const newUser = await UserModel.findById(
    user._id,
    '_id avatar username email',
  );

  res.send({user: newUser});
};
