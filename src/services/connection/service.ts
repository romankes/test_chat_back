import {Socket} from 'socket.io';

import logger from 'jet-logger';
import {jwt} from '@/helpers';
import {TUser, UserModel} from '@/models';
import {TConnectReturn, TDisconnectReturn} from './types';
import {Connection} from '@/types';

export const connect = async (
  socket: Socket,
): Promise<TConnectReturn | null> => {
  try {
    const token = socket.request.headers.cookie;

    if (!token) {
      socket.disconnect();
      return null;
    }
    const data = (await jwt.decode(token)) as {_id: string};
    if (data) {
      const user = await UserModel.findByIdAndUpdate(data._id, {
        online: true,
        socketId: socket.id,
      });

      return {socket, user: user.toJSON() as TUser};
    } else {
      socket.disconnect();
      return null;
    }
  } catch (e) {
    logger.err(`Connect service ${e}`);

    socket.disconnect();
    return null;
  }
};

export const disconnect = async ({
  socket,
  user,
}: Connection.DisconnectArgs): Promise<TDisconnectReturn | null> => {
  try {
    const newUser = await UserModel.findByIdAndUpdate(user._id, {
      online: false,
      socketId: '',
    });

    return {
      socket,
      user: newUser.toJSON() as TUser,
    };
  } catch (e) {
    logger.err(`Disconnect service ${e}`);

    return null;
  }
};
