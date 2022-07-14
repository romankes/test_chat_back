import {TUser} from '@/models';
import {App} from '@/types';

type TArgs = {
  users: TUser[];
  initiator: App.Id;
};

type TReturn = {
  socketIds: string[];
  deviceTokens: string[];
  ids: App.Id[];
};

export const extractUsers = ({users, initiator}: TArgs): TReturn => {
  const filtered = users.filter(({_id}) => `${_id}` !== `${initiator}`);

  const deviceTokens = [
    ...new Set(filtered.map(({deviceToken}) => deviceToken)),
  ];

  const socketIds = [...new Set(filtered.map(({socketId}) => socketId))];

  const ids = [...new Set(filtered.map(({_id}) => _id))];

  return {
    deviceTokens,
    socketIds,
    ids,
  };
};
