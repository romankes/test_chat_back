import {db} from '@/models';
import {UserService} from './types';

export const updateItem = async (
  data: UserService.UpdateItem,
  userId: string,
): Promise<UserService.ResUpdateItem | null> => {
  const user = await db.user.update(userId, data);

  return user;
};

export const getItems = async (
  page: number,
  per: number,
  username: string,
): Promise<UserService.ResGetItems> => {
  const {users, totalPage} = await db.user.getItemsByName(username, page, per);

  return {users, totalPage};
};

export const updateDeviceToken = async (
  userId: string,
  token: string,
): Promise<UserService.ResUpdateDeviceToken | null> => {
  const user = await db.user.updateDeviceToken(userId, token);

  return user;
};
