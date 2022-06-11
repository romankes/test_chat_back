import {saveDocument} from '@/helpers';
import {UserModelTypes, UserModel, RoomModel, MessageModel} from '@/models';

import {Request, Response} from 'express';
import {Server} from 'socket.io';
import {Room} from './namespace';

import {roomService} from '@/services';
//Room.CreateRoomRes

export const createRoom = async (
  req: Request<{}, {}, Room.CreateRoomBody>,
  res: Response,
  io: Server,
) => {
  try {
    const {user_ids, title} = req.body;
    const {user} = res.locals;

    const room = await roomService.createRoom(
      {
        admin: user._id,
        title: title,
        users: user_ids,
      },
      io,
    );

    if (room) {
      res.send({room});
    } else {
      res.sendStatus(422);
    }
  } catch (e) {
    console.log(e);

    res.sendStatus(422);
  }
};
export const getRooms = async (
  req: Request,
  res: Response<{}, {user: UserModelTypes.Item}>,
) => {
  try {
    const {user} = res.locals;

    //TODO: add ts
    const {page = 1, per = 10} = req.query;

    const rooms = await roomService.getRooms(+page, +per, user._id);

    res.json(rooms);
  } catch (e) {
    console.log(`error get rooms ${e}`);
  }
};

export const getRoom = async (
  req: Request<Room.GetRoomParams>,
  res: Response,
) => {
  try {
    const {id} = req.params;

    const {room, messages} = await roomService.getRoomDetail(id);

    if (room) {
      res.json({
        room,
        messages,
      });
    } else {
      res.sendStatus(422);
    }
  } catch (e) {
    console.log(`error get room ${e}`);
  }
};

export const removeRoom = async (
  req: Request,
  res: Response,
  io: Server,
): Promise<void> => {
  try {
    const {id} = req.params;
    const {user} = res.locals;

    const room = await roomService.removeRoom(id, user._id, io);

    res.json({room});
  } catch (e) {
    console.log(`error remove room ${e}`);
    res.sendStatus(422);
  }
};
