import {MessageModel, NUserModel, RoomModel} from '@/models';
import {Request, Response} from 'express';
import {Server} from 'socket.io';
import {Message} from './namespace';

export const createMessage = async (
  req: Request<{}, {}, Message.CreateMessageBody>,
  res: Response<{}, {user: NUserModel.Item}>,
  io: Server,
) => {
  try {
    const {room_id, text} = req.body;

    const {user} = res.locals;

    const room = await RoomModel.findById(room_id).populate(
      'users',
      'socket_id',
    );

    if (room) {
      const messageDoc = await new MessageModel({
        text,
        room: room_id,
        user: user._id,
      }).save();

      room.toJSON().users.forEach((user) => {
        //@ts-ignore
        if (user.socket_id) {
          //@ts-ignore
          console.log(user.socket_id);

          //@ts-ignore
          io.to(user.socket_id).emit('create_message', messageDoc.toJSON());
        }
      });

      res.send({});
    } else {
      res.sendStatus(422);
    }
  } catch (e) {
    console.log(`error create message ${e}`);
  }
};
