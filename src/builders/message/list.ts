import {TUser} from '@/models';
import {TMessage} from '@/models';
import {Message} from '@/types';
import {User} from '@/types/User';

export const listBuilder = (message: TMessage<TUser>): Message.ListBuilder => ({
  _id: message._id,
  notRead: message.notRead,
  room: message.room,
  text: message.text,
  image: message.image,
  createdAt: message.createdAt,
  updatedAt: message.updatedAt,
  user: {
    _id: message.user._id,
    avatar: message.user.avatar,
    email: message.user.email,
    name: message.user.name,
    online: message.user.online,
    updatedAt: message.user.updatedAt,
    createdAt: message.createdAt,
  },
});
