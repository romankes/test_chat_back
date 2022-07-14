import {App, User} from '@/types';
import {Server} from 'socket.io';

export type TRemoveParams = {
  id: App.Id;
  io: Server;
};

export type TParamsList = {
  page: number;
  per: number;
  name: string;
  initiator: App.Id;
};

export type TReturnList = {users: User.ListBuilder[]; totalCount: number};

export type TParamsUpdate = {
  id: App.Id;
  user: {
    deviceToken?: string;
    avatar?: string;
    name?: string;
    currentRoom?: string;
  };
};

export type TReturnUpdate = User.ShowBuilder;
