import {db} from '@/models';

export const updateUserCurrentRoom = async (
  room: string,
  user: string,
): Promise<void> => {
  await db.user.updateCurrentRoom(room, user);
};
