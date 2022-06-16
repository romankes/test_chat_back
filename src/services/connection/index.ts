import {db} from '@/models';

export const connect = async (token: string, socketId: string) => {
  const user = await db.user.updateStatus(token, socketId, true);

  return user;
};

export const disconnect = async (token: string) => {
  const user = await db.user.updateStatus(token, '', false);

  return user;
};
