import {db} from '@/models';

export const updateUserCurrentRoom = async (room: string, user: string) => {
  await db.user.updateCurrentRoom(room, user);
};
