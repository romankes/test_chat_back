import {Request, Response} from 'express';
import {Server} from 'socket.io';
import {Room} from './namespace';

import {roomService} from '@/services';
import {CurrentUser} from '@/types';
import {messageBuilder, roomBuilder} from '@/builders';

export const createItem = async (
  req: Request<{}, {}, Room.CreateItemBody>,
  res: Response<Room.ResCreateItem, CurrentUser>,
  io: Server,
) => {
  try {
    const {users, title} = req.body;
    const {user} = res.locals;

    const room = await roomService.createItem(
      {
        admin: user._id,
        title: title,
        users: users,
        avatar: req.file.path.replace(/^\/\//g, '/'),
      },
      io,
    );

    if (room) {
      res.send({room: roomBuilder(room)});
    } else {
      res.sendStatus(422);
    }
  } catch (e) {
    console.log(e);

    res.sendStatus(422);
  }
};
export const getItems = async (
  req: Request,
  res: Response<Room.ResGetItems, CurrentUser>,
) => {
  try {
    const {user} = res.locals;

    const {page = 1, per = 10} = req.query;

    const {items, totalPage} = await roomService.getItems(
      +page,
      +per,
      user._id,
    );

    res.json({
      rooms: items.map(roomBuilder),
      totalPage,
    });
  } catch (e) {
    console.log(`error get rooms ${e}`);
  }
};

export const getDetail = async (
  req: Request<Room.GetDetailParams>,
  res: Response<Room.ResGetDetail, CurrentUser>,
) => {
  try {
    const {id} = req.params;
    const {user} = res.locals;

    const {item, messages} = await roomService.getDetail(id, user._id);

    if (item) {
      res.json({
        room: roomBuilder(item),
        messages: messages.map(messageBuilder),
      });
    } else {
      res.sendStatus(422);
    }
  } catch (e) {
    console.log(`error get room ${e}`);
  }
};

export const removeItem = async (
  req: Request<Room.RemoveItemParams>,
  res: Response<{}, CurrentUser>,
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
