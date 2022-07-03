import {AnyObjectSchema} from 'yup';

import {NextFunction} from 'express';
import {handleError} from '.';
import {errors} from './handleError';
import {App} from '@/types';

import logger from 'jet-logger';

export const validate =
  (schema: AnyObjectSchema) =>
  async (req: App.BaseRequest, res: App.BaseResponse, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (e) {
      logger.info(`Params not defined: ${JSON.stringify(e)}`);
      handleError(res, errors.paramsIsMising());
    }
  };
