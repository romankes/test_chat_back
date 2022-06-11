import {MessageModel, UserModelTypes, RoomModel} from '@/models';
import {messageService} from '@/services';
import {Request, Response} from 'express';
import {Server} from 'socket.io';
import {Message} from './namespace';

export const createMessage = async (
  req: Request<{}, {}, Message.CreateMessageBody>,
  res: Response<{}, {user: UserModelTypes.Item}>,
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

    console.log(message);

    if (message) {
      res.json({message});
    } else {
      res.sendStatus(422);
    }
  } catch (e) {
    console.log(`error create message ${e}`);
  }
};
