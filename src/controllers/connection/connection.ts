import {UserModel} from '@/models/User';
import {Socket} from 'socket.io';

export const connect = async (socket: Socket) => {
  try {
    const token = socket.handshake.auth.token.replace('Bearer ', '');

    await UserModel.findOneAndUpdate({token}, {socket_id: socket.id});
  } catch (e) {
    console.log(`error socket connect ${e}`);
  }
};

export const disconnect = async (socket: Socket) => {
  try {
    const token = socket.handshake.auth.token.replace('Bearer ', '');

    await UserModel.findOneAndUpdate({token}, {socket_id: ''});
  } catch (e) {
    console.log(`error socket disconnect ${e}`);
  }
};
