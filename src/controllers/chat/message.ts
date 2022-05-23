import {Server, Socket} from 'socket.io';
import {MessageModel} from '../../models';
import {Chat} from './namespace';

export const createMessage = async (
  data: Chat.ReqCreateMessage,
  socket: Socket,
  server: Server,
) => {
  //   const mewssage = new MessageModel(data.message);
  const sockets = await server.allSockets();

  socket.broadcast.emit('message_get', data);
  console.log(data);
};
