import logger from 'jet-logger';

import {App, Auth} from '@/types';
import {handleError} from '@/helpers';
import {authService} from '@/services';
import {errors} from '@/helpers/handleError';

import HttpStatusCode from 'http-status-codes';

export const signIn = async (
  req: App.BaseRequest<Auth.SignInBody>,
  res: App.BaseResponse,
) => {
  try {
    const token = await authService.signIn(req.body.user);

    if (!token) {
      return handleError(res, errors.userNotFound());
    }
    console.log(token);

    res.cookie('auth', token, {
      httpOnly: true,
      signed: true,
    });

    res.sendStatus(HttpStatusCode.OK);
  } catch (e) {
    logger.err(`Sign in controller ${e}`);
    handleError(res, errors.paramsIsInvalid());
  }
};

export const signUp = async (
  req: App.BaseRequest<Auth.SignUpBody>,
  res: App.BaseResponse,
) => {
  try {
    const token = await authService.signUp(req.body.user);

    if (!token) {
      return handleError(res, errors.userAlreadyExists());
    }

    res.cookie('auth', token, {
      httpOnly: true,
      signed: true,
    });

    res.sendStatus(HttpStatusCode.OK);
  } catch (e) {
    logger.err(`Sign in controller ${e}`);
    handleError(res, errors.paramsIsInvalid());
  }
};
