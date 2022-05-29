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

    const {user: currentUser} = res.locals;

    const room = await RoomModel.findById(room_id).populate(
      'users',
      'socket_id',
    );

    if (room) {
      const messageDoc = await new MessageModel({
        text,
        room: room_id,
        user: currentUser._id,
      }).save();

      const messageDocForRes = await messageDoc.populate(
        'user',
        '-rooms -token -password -socket_id -__v -createdAt',
      );

      room.toJSON().users.forEach((user) => {
        //@ts-ignore

        if (user.socket_id !== currentUser.socket_id) {
          //@ts-ignore

          //@ts-ignore
          io.to(user.socket_id).emit('create_message', messageDoc.toJSON());
        }
      });

      res.send({message: messageDocForRes});
    } else {
      res.sendStatus(422);
    }
  } catch (e) {
    console.log(`error create message ${e}`);
  }
};
