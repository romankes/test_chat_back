import {App, Message, Room} from '@/types';
import {Server} from 'socket.io';

export type TCreatePayload = {
  data: Message.CreateBody & {userId: App.Id};
  io: Server;
};

export type TListReturn = Message.ListBuilder;

export type TRemoveParams = {
  id: App.Id;
  io: Server;
};

export type TRemoveReturn = Message.ListBuilder;

export type TUpdateParams = {
  io: Server;
  initiator: App.Id;
  id: App.Id;
  data: {
    text?: string;
  };
};
