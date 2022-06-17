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
  name: string,
): Promise<UserService.ResGetItems> => {
  const {items, totalPage} = await db.user.getItemsByName(name, page, per);

  return {items, totalPage};
};

export const updateDeviceToken = async (
  userId: string,
  token: string,
): Promise<UserService.ResUpdateDeviceToken | null> => {
  const user = await db.user.updateDeviceToken(userId, token);

  return user;
};
