import {RoomModelTypes} from './types';
import {RoomModel} from './Room';

export const create = async (
  data: RoomModelTypes.CreatePayload,
): Promise<RoomModelTypes.Model> => {
  const room = new RoomModel(data);

  await room.save();

  return room.toJSON();
};

export const getUsersByItem = async (
  id: string,
): Promise<RoomModelTypes.User[]> => {
  const doc = await RoomModel.findById(id);

  const room: RoomModelTypes.PublicItem = await doc.populate(
    'users',
    'name _id email online updatedAt avatar socketId deviceToken currentRoom',
  );

  return room.users.map((user) => ({
    ...user,
    role: room.admin.toString() === user._id.toString() ? 'admin' : 'user',
  }));
};

export const exists = async (_id: string): Promise<boolean> => {
  const isExists = await RoomModel.exists({_id});

  return !!isExists;
};

export const remove = async (id: string): Promise<string> => {
  await RoomModel.findByIdAndDelete(id);

  return id;
};

export const getDetail = async (
  id: string,
): Promise<RoomModelTypes.PublicItem> => {
  const doc = await RoomModel.findById(id);

  const room: RoomModelTypes.PublicItem = await doc.populate(
    'users',
    'name _id email online updatedAt avatar socketId deviceToken',
  );

  return room;
};

export const getItems = async (
  page: number,
  per: number,
  userId: string,
): Promise<RoomModelTypes.ResGetItems> => {
  const rooms: RoomModelTypes.PublicItem[] = await RoomModel.find(
    {users: {$in: userId}},
    {},
    {skip: (page - 1) * per, limit: per},
  ).populate(
    'users',
    'name _id email online updatedAt avatar socketId deviceToken',
  );
  const totalCount = await RoomModel.countDocuments();

  return {
    totalPage: Math.ceil(totalCount / per),
    items: rooms,
  };
};

export const leave = async (
  roomId: string,
  user: string,
): Promise<RoomModelTypes.ResLeave> => {
  const doc = await RoomModel.findByIdAndUpdate(roomId, {
    $pull: {users: user},
  });

  const room = {
    ...doc.toJSON(),
    users: doc.toJSON().users.filter((_id) => _id !== user),
  };

  if (!room.users.length) {
    const room = await RoomModel.findByIdAndDelete(roomId);

    return {room: room.toJSON(), command: 'remove'};
  }

  return {room, command: 'leave'};
};
