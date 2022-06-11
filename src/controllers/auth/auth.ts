import {Request, Response} from 'express';
import {Auth} from './namespace';

import {authService} from '@/services';

export const signIn = async (
  req: Request<{}, {}, Auth.SignInBody>,
  res: Response<Auth.SignInRes>,
) => {
  try {
    const token = await authService.signIn(req.body);

    if (token) {
      res.json({token});
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    console.log(`error sign in action ${e}`);
    res.sendStatus(422);
  }
};
export const signUp = async (
  req: Request<{}, {}, Auth.SignUpBody>,
  res: Response<Auth.SignUpRes>,
) => {
  try {
    const token = await authService.signUp(req.body);

    if (token) {
      res.json({token});
    } else {
      res.sendStatus(422);
    }
  } catch (e) {
    console.log(`error sign up action ${e}`);
    res.sendStatus(422);
  }
};
