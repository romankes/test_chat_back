import {TCustomError} from './errors';
import {App} from '@/types';

import logger from 'jet-logger';

export const handleError = (res: App.BaseResponse, error: TCustomError) => {
  logger.err(`error message: ${error.message}; status: ${error.status}`);

  res.status(error.status).json({message: error.message}).end();
};
