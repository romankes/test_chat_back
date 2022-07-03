import {App} from '@/types';

export type TMessage<U = App.Id, R = App.Id> = {
  text: string;
  room: R;
  user: U;
  _id: string;
  notRead: App.Id[];
  updatedAt: string;
};
