import {errors, handleError, jwt} from '@/helpers';
import {TUser, UserModel} from '@/models';
import {App} from '@/types';
import {NextFunction, Request, Response} from 'express';

export const auth = async (
  req: App.BaseRequest,
  res: App.BaseResponse,
  next: NextFunction,
) => {
  try {
    const token = req.signedCookies['auth'];

    console.log(token);

    if (!token) {
      return handleError(res, errors.unauthorized());
    }
    const data = (await jwt.decode(token)) as {_id: string};
    if (data) {
      const user = await UserModel.findById(data._id);

      res.locals.user = user as TUser;
      next();
    } else {
      return handleError(res, errors.unauthorized());
    }
  } catch (err) {
    return handleError(res, errors.unauthorized());
  }
};
