import {TUser} from '@/models';
import {App} from '@/types';

type TArgs = {
  users: TUser[];
  initiator: App.Id;
};

type TReturn = {
  socketIds: string[];
  deviceTokens: string[];
};

export const extractUsers = ({users, initiator}: TArgs): TReturn => {
  const filtered = users.filter(({_id}) => _id !== initiator);

  return {
    deviceTokens: filtered.map(({deviceToken}) => deviceToken),
    socketIds: filtered.map(({socketId}) => socketId),
  };
};
