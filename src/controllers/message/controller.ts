import {errors, handleError} from '@/helpers';
import {messageService} from '@/services';
import {App, Message} from '@/types';

import logger from 'jet-logger';
import {Server} from 'socket.io';

export const create =
  (io: Server) =>
  async (req: App.BaseRequest<Message.CreateBody>, res: App.BaseResponse) => {
    try {
      const {user} = res.locals;
      const {roomId, text} = req.body;

      const message = await messageService.create({
        data: {
          userId: user._id,
          roomId,
          text,
        },
        io,
      });
    } catch (e) {
      logger.err(`Create message controller ${e}`);
      handleError(res, errors.paramsIsInvalid());
    }
  };

export const remove =
  (io: Server) =>
  async (
    req: App.BaseRequest<{}, {}, Message.RemoveParams>,
    res: App.BaseResponse,
  ) => {
    try {
      const {id} = req.params;
      const message = await messageService.remove({
        id,
        io,
      });

      if (!message) {
        return handleError(res, errors.messageNotFound());
      }

      res.json({message});
    } catch (e) {
      logger.err(`Remove message controller ${e}`);
      handleError(res, errors.paramsIsInvalid());
    }
  };
