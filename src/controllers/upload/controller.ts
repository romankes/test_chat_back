import logger from 'jet-logger';
import {App} from '@/types';
import {ENV} from '@/configs';

type TParams = {
  filename: string;
};

export const users = (
  req: App.BaseRequest<{}, {}, TParams>,
  res: App.BaseResponse,
) => {
  try {
    res.sendFile(`${ENV.FILE_PATH}/users/${req.params.filename}`);
  } catch (e) {
    logger.err(`Upload user controller ${e}`);
  }
};

export const rooms = (
  req: App.BaseRequest<{}, {}, TParams>,
  res: App.BaseResponse,
) => {
  try {
    res.sendFile(`${ENV.FILE_PATH}/rooms/${req.params.filename}`);
  } catch (e) {
    logger.err(`Upload rooms controller ${e}`);
  }
};

export const messages = (
  req: App.BaseRequest<{}, {}, TParams>,
  res: App.BaseResponse,
) => {
  try {
    res.sendFile(`${ENV.FILE_PATH}/messages/${req.params.filename}`);
  } catch (e) {
    logger.err(`Upload rooms controller ${e}`);
  }
};
