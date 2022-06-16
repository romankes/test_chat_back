import {messageService} from '@/services';
import {CurrentUser} from '@/types';
import {Request, Response} from 'express';
import {Server} from 'socket.io';
import {Message} from './namespace';

export const createItem = async (
  req: Request<{}, {}, Message.CreateItemBody>,
  res: Response<Message.ResCreateItem, CurrentUser>,
  io: Server,
) => {
  try {
    const {room_id, text} = req.body;

    const {user} = res.locals;

    const message = await messageService.createMessage(
      {
        room: room_id,
        text: text,
        user: user._id,
      },
      io,
    );

    if (message) {
      res.json({message});
    } else {
      res.sendStatus(422);
    }
  } catch (e) {
    console.log(`error create message ${e}`);
  }
};

export const removeItem = async (
  req: Request<Message.RemoveItemParams>,
  res: Response<Message.ResRemoveItem, CurrentUser>,
  io: Server,
) => {
  try {
    const {id} = req.params;
    const {user} = res.locals;

    const message = await messageService.removeItem(id, user._id, io);

    if (message) {
      res.json({message});
    } else {
      res.sendStatus(422);
    }
  } catch (e) {
    console.log(`error remove message ${e}`);
    res.sendStatus(422);
  }
};
