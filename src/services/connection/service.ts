import {Socket} from 'socket.io';

import logger from 'jet-logger';
import {jwt} from '@/helpers';
import {TUser, UserModel} from '@/models';
import {TConnectReturn, TDisconnectReturn} from './types';
import {Connection} from '@/types';

import {parse} from 'cookie';
import {JSONCookies} from 'cookie-parser';

export const connect = async (
  socket: Socket,
): Promise<TConnectReturn | null> => {
  try {
    //@ts-ignore
    const {auth: token} = parse(socket.request.headers.cookie, {});

    if (!token) {
      socket.disconnect();
      return null;
    }

    const length = token.split('.').length;
    const actual = token
      .replace(/s:/g, '')
      .split('.')
      .slice(0, length - 1)
      .join('.');
    logger.warn(actual);

    const data = (await jwt.decode(actual)) as {_id: string};

    logger.warn(data);

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
