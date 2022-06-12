import {RoomModelTypes} from './types';
import {RoomModel} from './Room';

export const create = async (
  data: RoomModelTypes.CreatePayload,
): Promise<RoomModelTypes.Item> => {
  const room = new RoomModel(data);

  await room.save();

  return room.toJSON();
};

export const getAllUsersByRoom = async (id: string): Promise<any[]> => {
  const doc = await RoomModel.findById(id);

  const room = await doc.populate(
    'users',
    '-rooms -token -password -__v -createdAt',
  );

  return room.users;
};

export const exists = async (_id: string): Promise<boolean> => {
  const isExists = await RoomModel.exists({_id});

  return !!isExists;
};

export const removeRoom = async (id: string): Promise<string> => {
  await RoomModel.findByIdAndDelete(id);

  return id;
};

export const getRoom = async (id: string): Promise<any> => {
  const doc = await RoomModel.findById(id);

  const room = await doc.populate(
    'users',
    '-rooms -token -password -__v -createdAt -socket_id -currentRoom -deviceToken',
  );

  return room;
};

export const getRooms = async (
  page: number,
  per: number,
  userId: string,
): Promise<any> => {
  const rooms = await RoomModel.find(
    {users: {$in: userId}},
    {},
    {skip: (page - 1) * per, limit: per},
  ).populate(
    'users',
    '-rooms -token -password -__v -createdAt -socket_id -currentRoom -deviceToken',
  );
  const totalCount = await RoomModel.countDocuments();

  return {
    totalPage: Math.ceil(totalCount / per),
    rooms: rooms.map((room) => room.toJSON()),
  };
};

export const leaveRoom = async (roomId: string, user: string): Promise<any> => {
  const room = await RoomModel.findByIdAndUpdate(roomId, {
    $pull: {users: user},
  });

  return room.toJSON();
};
