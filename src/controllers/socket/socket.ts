import {socketService} from '@/services';

export const removeCurrentRoom = async (user: string) => {
  await socketService.updateUserCurrentRoom(user, '');
};
