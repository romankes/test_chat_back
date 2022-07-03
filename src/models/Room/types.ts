import {App} from '@/types';

export type TRoom<U = App.Id> = {
  title: string;
  _id: App.Id;
  admin: App.Id;
  users: U[];
  avatar: string;
  createdAt: string;
  updatedAt: string;
};
