import {TUser} from '@/models';
import {Request, Response} from 'express';
import {Schema} from 'mongoose';

export namespace App {
  export type Id = Schema.Types.ObjectId;

  export type BaseRequest<B = {}, Q = {}, P = {}> = Request<P, {}, B, Q>;
  export type BaseResponse<
    R = {},
    L = {
      user: TUser;
    },
  > = Response<R, L>;
}
