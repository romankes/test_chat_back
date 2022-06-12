import {UserModel} from '@/models/User';
import {Socket} from 'socket.io';
import {socketController} from '../socket';

export const connect = async (socket: Socket) => {
  try {
    const token = socket.handshake.auth.token.replace('Bearer ', '');

    const user = await UserModel.findOneAndUpdate(
      {token},
      {socket_id: socket.id, online: true},
    );

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

    await UserModel.findOneAndUpdate({token}, {socket_id: '', online: false});
  } catch (e) {
    console.log(`error socket disconnect ${e}`);
  }
};
