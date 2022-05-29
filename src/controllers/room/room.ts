import {saveDocument} from '@/helpers';
import {
  NUserModel,
  UserModel,
  RoomModel,
  NRoomModel,
  MessageModel,
} from '@/models';

import {Request, Response} from 'express';
import {Document, PaginateResult} from 'mongoose';
import {Server} from 'socket.io';
import {Room} from './namespace';

//Room.CreateRoomRes

export const createRoom = async (
  req: Request<{}, {}, Room.CreateRoomBody>,
  res: Response<Room.CreateRoomRes, {user: NUserModel.Item}>,
  io: Server,
) => {
  try {
    const {user_ids, title} = req.body;

    const {user} = res.locals;

    const users = await UserModel.find({_id: user_ids});

    const doc = await new RoomModel({
      title,
      users: users.map(({_id}) => _id),
      admin: user._id,
    }).save();

    await Promise.all(
      users.map(async (user) => {
        return await user.update({$push: {rooms: doc._id}});
      }),
    );

    const roomDoc = await doc.populate(
      'users',
      '-rooms -token -password -socket_id -__v -createdAt',
    );

    const room = roomDoc.toJSON();

    res.send({
      room: {
        _id: room._id,
        title: room.title,
        admin: room.admin,
        users: room.users,
      },
    });
  } catch (e) {
    console.log(e);

    res.sendStatus(422);
  }
};
export const getRooms = async (
  req: Request,
  res: Response<{}, {user: NUserModel.Item}>,
) => {
  try {
    const {user} = res.locals;

    const {} = req.query;

    //TODO: Remove ts ignore
    const docs = await RoomModel.find({users: {$in: user._id}});

    const rooms = await Promise.all(
      docs.map(
        async (room) =>
          await room.populate(
            'users',
            '-rooms -token -password -socket_id -__v -createdAt',
          ),
      ),
    );

    console.log(rooms);

    res.send({rooms});
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

    const room = await RoomModel.findById(id).populate(
      'users',
      '-rooms -token -password -socket_id -__v -createdAt',
    );

    const messages = await MessageModel.find({room: id}, '-room -__v').populate(
      'user',
      '-rooms -token -password -socket_id -__v -createdAt',
    );

    res.send({
      room: room.toJSON(),
      messages,
    });
  } catch (e) {
    console.log(`error get room ${e}`);
  }
};
