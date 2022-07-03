import {errors, handleError} from '@/helpers';
import {roomService} from '@/services';
import {App, Room} from '@/types';

import logger from 'jet-logger';
import {Server} from 'socket.io';

export const create =
  (io: Server) =>
  async (
    req: App.BaseRequest<Room.CreateBody>,
    res: App.BaseResponse<Room.CreateRes>,
  ) => {
    try {
      const room = await roomService.create({
        currentUser: res.locals.user._id,
        data: {
          room: {...req.body.room, admin: res.locals.user._id},
        },
        io,
      });

      if (!room) {
        return handleError(res, errors.paramsIsInvalid());
      }

      res.json({room});
    } catch (e) {
      logger.err(`Create room controller ${e}`);
      handleError(res, errors.paramsIsInvalid());
    }
  };

export const list = async (
  req: App.BaseRequest<{}, Room.ListParams>,
  res: App.BaseResponse<Room.ListRes>,
) => {
  try {
    const result = await roomService.list({
      ...req.query,
      userId: res.locals.user._id,
    });

    if (!result) {
      return handleError(res, errors.paramsIsInvalid());
    }

    res.json(result);
  } catch (e) {
    logger.err(`List room controller ${e}`);
    handleError(res, errors.paramsIsInvalid());
  }
};

export const show = async (
  req: App.BaseRequest<{}, {}, Room.ShowParams>,
  res: App.BaseResponse<Room.ShowRes>,
) => {
  try {
    const {id} = req.params;

    const room = await roomService.show(id);

    if (!room) {
      return handleError(res, errors.roomNotFound());
    }

    res.json({room});
  } catch (e) {
    logger.err(`Show room controller ${e}`);
    handleError(res, errors.paramsIsInvalid());
  }
};

export const remove =
  (io: Server) =>
  async (
    req: App.BaseRequest<{}, {}, Room.RemoveParams>,
    res: App.BaseResponse,
  ) => {
    try {
      const {user} = res.locals;

      const room = await roomService.remove({
        id: req.params.id,
        initiator: user._id,
        io,
      });

      res.json();
    } catch (e) {
      logger.err(`Remove room controller`);
      handleError(res, errors.paramsIsInvalid());
    }
  };
