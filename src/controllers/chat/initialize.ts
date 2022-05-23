import {Server, Socket} from 'socket.io';
import {messageChatControllers, userChatControllers} from '.';
import {UserModel} from '../../models';
import {Chat} from './namespace';

export const connect = async (socket: Socket, server: Server) => {
  console.log(`new connection: \n =============== \n `);
  try {
    // const token = socket.handshake.auth.token.replace('Bearer ', '');

    // const user = await UserModel.findOneAndUpdate(
    //   {token},
    //   {online: true, socket_id: socket.id},
    // );
    console.log(`new connection: \n =============== \n `);
    // //   console.log(user);
    // console.log('===================');

    if (true) {
      socket.on('disconnect', () => userChatControllers.disconect(socket));

      socket.on('message_create', (data: Chat.ReqCreateMessage) =>
        messageChatControllers.createMessage(data, socket, server),
      );
    } else {
      socket.disconnect();
    }
  } catch (e) {
    console.log(`error parse token ${e}`);
    socket.disconnect();
  }
};
