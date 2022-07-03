import {TUser} from '@/models';
import {Socket} from 'socket.io';

export type TBaseReturn = {
  socket: Socket;
  user: TUser;
};

export type TConnectReturn = TBaseReturn;

export type TConnectionParams = {
  socket: Socket;
  id: string;
};

export type TDisconnectReturn = TBaseReturn;
