import {NextFunction, Request, Response} from 'express';
import {UserModel} from '@/models';

export const parseHeader = (req: Request) => {
  const authorization = req.headers?.authorization || '';
  if (authorization) {
    const arr = authorization.split(' ');

    if (arr.length) {
      return arr[1];
    }
  }

  return '';
};

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = parseHeader(req);

    if (token) {
      const user = await UserModel.findOne({token}).select(
        '_id username email phone role createdAt updatedAt token online',
      );

      if (user) {
        res.locals = {
          user,
        };
        next();
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    console.log(`error validate token middleware ${e}`);

    res.sendStatus(401);
  }
};
