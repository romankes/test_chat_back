import {Request, Response} from 'express';
import {NUserModel} from '@/models';
import {User} from './namespace';

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
