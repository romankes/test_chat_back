import {Request, Response} from 'express';
import {UserModelTypes, UserModel} from '@/models';
import {User} from './namespace';

import multer from 'multer';
import {userService} from '@/services';
import {sendPush} from '@/helpers/sendPush';

export const getUser = (
  req: Request,
  res: Response<User.GetUserRes, {user: UserModelTypes.Item}>,
) => {
  try {
    const {user} = res.locals;

    if (user) {
      res.send({user});
    } else {
      res.sendStatus(422);
    }
  } catch (e) {
    console.log(`get user action ${e}`);
    res.sendStatus(422);
  }
};
export const getOnlineUsers = () => {};

export const updateUser = async (
  req: Request<{}, {}, User.UpdateUserBody>,
  res: Response<{}, {user: UserModelTypes.Item}>,
) => {
  try {
    const {username = ''} = req.body;

    const {user: currentUser} = res.locals;

    const user = await userService.updateUser(
      {
        username,
        avatar: req.file.path.replace(/^\/\//g, '/'),
      },
      currentUser._id,
    );

    if (user) {
      res.json({user});
    } else {
      res.sendStatus(422);
    }
  } catch (e) {
    console.log(`error update user ${e}
    `);
    res.sendStatus(422);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const {username = '', page = 1, per = 10} = req.query;

    const users = await userService.getUsers(+page, +per, username as string);

    res.json(users);
  } catch (e) {
    console.log(`error get users ${e}`);
    res.sendStatus(422);
  }
};

export const updateDeviceToken = async (req: Request, res: Response) => {
  try {
    const {token} = req.body;
    const {user} = res.locals;

    const newUser = await userService.updateDeviceToken(user._id, token);

    res.sendStatus(204);
  } catch (e) {
    console.log(`error update device token ${e}`);
    res.sendStatus(422);
  }
};
