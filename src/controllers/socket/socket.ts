import {socketService} from '@/services';
import {Socket} from './namespace';

export const removeCurrentRoom = async (user: string) => {
  await socketService.updateUserCurrentRoom(user, '');
};
