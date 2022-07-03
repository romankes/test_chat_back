import {userBuilders} from '@/builders';
import {errors, handleError} from '@/helpers';
import {userService} from '@/services';

import {App, User} from '@/types';

import logger from 'jet-logger';

import HttpStatusCode from 'http-status-codes';
import {Server} from 'socket.io';

export const userInfo = (req: App.BaseRequest, res: App.BaseResponse) => {
  try {
    const {user} = res.locals;

    if (!user) {
      return handleError(res, errors.userNotFound());
    }

    res.json({user: userBuilders.showBuilder(user)});
  } catch (e) {
    logger.err(`User show controller ${e}`);

    handleError(res, errors.unauthorized());
  }
};

export const remove =
  (io: Server) => async (req: App.BaseRequest, res: App.BaseResponse) => {
    try {
      const user = await userService.remove({id: res.locals.user._id, io});

      if (!user) {
        return handleError(res, errors.userNotFound());
      }

      res.clearCookie('auth', {
        httpOnly: true,
        signed: true,
      });

      res.sendStatus(HttpStatusCode.OK);
    } catch (e) {
      logger.err(`User remove controller ${e}`);
      handleError(res, errors.paramsIsInvalid());
    }
  };

export const list = async (
  req: App.BaseRequest<{}, User.ListQueries>,
  res: App.BaseResponse,
) => {
  try {
    const result = userService.list(req.query);

    if (result) {
      return handleError(res, errors.paramsIsInvalid());
    }

    res.json(result);
  } catch (e) {
    logger.err(`User list controller ${e}`);
    handleError(res, errors.paramsIsInvalid());
  }
};

export const update = async (
  req: App.BaseRequest<User.UpdateBody>,
  res: App.BaseResponse,
) => {
  try {
    const {user} = res.locals;

    const newUser = await userService.update({
      id: user._id,
      user: req.body,
    });

    if (!newUser) {
      return handleError(res, errors.paramsIsInvalid());
    }

    res.json({user: newUser});
  } catch (e) {
    logger.err(`User update controller ${e}`);
    handleError(res, errors.paramsIsInvalid());
  }
};
