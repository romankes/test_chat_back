import {TUser} from '@/models';
import {Socket} from 'socket.io';

export namespace Connection {
  export type DisconnectArgs = {
    socket: Socket;
    user: TUser;
  };
}
