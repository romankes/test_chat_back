import {
  NUserModel,
  UserModel,
  RoomModel,
  RoomUserModel,
  NRoomModel,
} from '@/models';

import {Request, Response} from 'express';
import {Server} from 'socket.io';
import {Room} from './namespace';

export const createRoom = async (
  req: Request<{}, {}, Room.CreateRoomBody>,
  res: Response<Room.CreateRoomRes, {user: NUserModel.Item}>,
  io: Server,
) => {
  try {
    const {user_ids, title, role} = req.body;

    const {user} = res.locals;

    const users = await UserModel.find({_id: user_ids}, '_id socket_id');

    const room = new RoomModel({
      title,
    });

    await room.save();

    await Promise.all(
      users.map(async (item: NUserModel.Item) => {
        const roomUser = new RoomUserModel({
          user_id: item._id,
          room_id: room._id,
          role: item._id.toString() === user._id.toString() ? role : 'user',
        });

        await roomUser.save();

        return roomUser;
      }),
    );

    if (room) {
      const roomUsers = await RoomUserModel.find({room_id: room._id});

      if (roomUsers.length) {
        const userIds = roomUsers.map(({user_id}) => user_id);

        const users = await UserModel.find(
          {_id: userIds},
          '_id name email online avatar updatedAt',
        );

        if (users.length) {
          const newRoom = {
            room: {
              title: room.title,
              _id: room._id,
              users: users.map((user) => ({
                ...user._doc,
                role:
                  roomUsers.find(
                    ({user_id}) => user_id.toString() === user._id.toString(),
                  )?.role || 'user',
              })),
            },
          };

          users.forEach((item: NUserModel.Item) => {
            if (item._id.toString() !== user._id.toString() && item.socket_id) {
              io.to(item.socket_id).emit('room_create', newRoom);
            }
          });

          res.status(200).send(newRoom as Room.CreateRoomRes);

          return;
        }
      }
    }

    res.sendStatus(422);
  } catch (e) {
    console.log(e);

    res.sendStatus(422);
  }
};
export const getRooms = async (req: Request, res: Response) => {
  try {
    const {} = req.query;
  } catch (e) {
    console.log(`error get rooms ${e}`);
  }
};
