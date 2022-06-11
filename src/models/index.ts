import {userMethods} from './User';
import {roomMethods} from './Room';
import {messageMethods} from './Message';

export * from './User';
export * from './Message';
export * from './Room';

export const db = {
  user: userMethods,
  room: roomMethods,
  message: messageMethods,
};
