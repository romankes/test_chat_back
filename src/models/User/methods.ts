import {UserModelTypes} from './types';
import {UserModel} from './User';

export const create = async (
  data: UserModelTypes.CreatePayload,
): Promise<UserModelTypes.Item> => {
  const user = new UserModel(data);

  await user.save();

  return user.toJSON();
};

export const update = async (
  id: string,
  data: UserModelTypes.UpdatePayload,
): Promise<UserModelTypes.Item> => {
  const user = await UserModel.findByIdAndUpdate(id, data);

  return user.toJSON();
};

export const remove = async (id: string): Promise<UserModelTypes.Item> => {
  const user = await UserModel.findByIdAndRemove(id);

  return user;
};

export const exist = async (email: string): Promise<UserModelTypes.Item> => {
  const user = await UserModel.findOne({email});

  return user.toJSON();
};

export const findUsers = async (
  ids: string[],
): Promise<UserModelTypes.Item[]> => {
  const docs = await UserModel.find(
    {_id: ids},
    '-rooms -token -password -__v -createdAt',
  );

  const users = docs.map((doc) => doc.toJSON());

  return users;
};

export const updateRooms = async (
  id: string,
  room: string[],
): Promise<UserModelTypes.Item> => {
  const user = await UserModel.findByIdAndUpdate(id, {$push: {room}});

  return user.toJSON();
};

export const getUsersByName = async (
  username: string,
  page: number,
  per: number,
) => {
  const users = await UserModel.find(
    {
      username: {$regex: username, $options: 'i'},
    },
    '-rooms -token -password -__v -createdAt',
    {skip: (page - 1) * per, limit: per},
  );

  const totalCount = await UserModel.countDocuments();

  return {
    totalPage: Math.ceil(totalCount / per),
    users: users.map((users) => users.toJSON()),
  };
};
