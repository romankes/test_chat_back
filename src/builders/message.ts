import {MessageModelTypes} from '@/models';
import {UserForRes} from '@/types';

export type TMessageBuilder = {
  _id: string;
  text: string;
  user: UserForRes;
};

export const messageBuilder = (
  message: MessageModelTypes.PublicItem,
): TMessageBuilder => ({
  _id: message._id,
  text: message.text,
  user: {
    _id: message.user._id,
    avatar: message.user.avatar,
    email: message.user.email,
    online: message.user.online,
    role: message.user.role,
    updatedAt: message.user.updatedAt,
    name: message.user.name,
  },
});
