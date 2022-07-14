import {App, Message, Room} from '@/types';
import {Server} from 'socket.io';

export type TCratePayload = {
  io: Server;
  data: Room.CreateBody;
  currentUser: App.Id;
};

export type TListPayload = Room.ListParams & {
  initiator: App.Id;
};

export type Room = Room.ListBuilder & {
  message: Message.ListBuilder | null;
};

export type TListReturn = {
  totalCount: number;
  rooms: Room[];
};

export type TShowParams = {
  initiator: App.Id;
  id: App.Id;
};

export type TShowReturn = Room.ShowBuilder & {
  messages: Message.ListBuilder[];
};

export type TRemoveParams = {
  io: Server;
  id: App.Id;
  initiator: App.Id;
};
