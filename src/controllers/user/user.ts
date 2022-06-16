import {Request, Response} from 'express';
import {User} from './namespace';

import {userService} from '@/services';
import {CurrentUser} from '@/types';

export const getDetail = (
  req: Request,
  res: Response<User.GetDetailRes, CurrentUser>,
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

export const updateItem = async (
  req: Request<{}, {}, User.UpdateItemBody>,
  res: Response<User.ResUpdateItem, CurrentUser>,
) => {
  try {
    const {username = ''} = req.body;

    const {user: currentUser} = res.locals;

    const user = await userService.updateItem(
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
    console.log(`error update user ${e}`);
    res.sendStatus(422);
  }
};

export const getUsers = async (
  req: Request<{}, {}, User.GetItemsParams>,
  res: Response<User.ResGetItems>,
) => {
  try {
    const {username, page, per} = req.query;

    const result = await userService.getItems(+page, +per, username as string);

    res.json(result);
  } catch (e) {
    console.log(`error get users ${e}`);
    res.sendStatus(422);
  }
};

export const updateDeviceToken = async (
  req: Request<{}, User.UpdateDeviceTokenBody>,
  res: Response<{}, CurrentUser>,
) => {
  try {
    const {token} = req.body;
    const {user} = res.locals;

    const newUser = await userService.updateDeviceToken(user._id, token);

    if (newUser) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(`error update device token ${e}`);
    res.sendStatus(422);
  }
};
