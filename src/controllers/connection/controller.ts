import {jwt} from '@/helpers';
import {UserModel} from '@/models';
import {connectionService} from '@/services';
import {Connection} from '@/types';
import logger from 'jet-logger';
import {Socket} from 'socket.io';

export const disconnect =
  (client: Connection.DisconnectArgs) =>
  async (reason: string): Promise<void> => {
    try {
      const result = await connectionService.disconnect(client);
      // if (client) {
      //   client.on('disconnect')
      // }

      logger.info(`Disconnect reason ${reason}`);
    } catch (e) {
      logger.err(`Disconnect controller ${e}`);
    }
  };

export const connect = async (socket: Socket): Promise<void> => {
  try {
    const client = await connectionService.connect(socket);

    if (client) {
      logger.info(`New client ${JSON.stringify(client?.user || {})}`);
      client.socket.on('disconnect', disconnect(client));
    }
  } catch (e) {
    logger.err(`Connect controller ${e}`);
  }
};
