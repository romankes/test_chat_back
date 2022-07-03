import {App} from '@/types';

export type TUser = {
  email: string;
  name: string;
  _id: App.Id;
  avatar: string;
  online: boolean;
  password: string;
  updatedAt: string;

  rooms: string[];

  currentRoom: string;
  deviceToken: string;
  socketId: string;
};
