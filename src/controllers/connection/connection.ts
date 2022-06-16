import {UserModel} from '@/models/User';
import {connectionController} from '@/services';
import {Socket} from 'socket.io';
import {socketController} from '../socket';

export const connect = async (socket: Socket) => {
  try {
    const token = socket.handshake.auth.token.replace('Bearer ', '');

    const user = await connectionController.connect(token, socket.id);

    socket.on('remove_current_room', () => {
      socketController.removeCurrentRoom(user._id);
    });
  } catch (e) {
    console.log(`error socket connect ${e}`);
  }
};

export const disconnect = async (socket: Socket) => {
  try {
    const token = socket.handshake.auth.token.replace('Bearer ', '');

    const user = await connectionController.disconnect(token);
  } catch (e) {
    console.log(`error socket disconnect ${e}`);
  }
};
