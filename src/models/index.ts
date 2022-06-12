import {userMethods} from './User';
import {roomMethods} from './Room';
import {messageMethods} from './Message';
import {notReadMessageMethods} from './NotReadMessage';

export * from './User';
export * from './Message';
export * from './Room';

export const db = {
  user: userMethods,
  room: roomMethods,
  message: messageMethods,
  notReadMessage: notReadMessageMethods,
};
