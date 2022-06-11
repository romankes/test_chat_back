import {db} from '@/models';
import {TUpdateUserPayload} from './types';

export const updateUser = async (
  data: TUpdateUserPayload,
  userId: string,
): Promise<any> => {
  const user = await db.user.update(userId, data);

  return user;
};

//TODO: add typescript
export const getUsers = async (
  page: number,
  per: number,
  username: string,
): Promise<any> => {
  const {users, totalPage} = await db.user.getUsersByName(username, page, per);

  return {users, totalPage};
};
