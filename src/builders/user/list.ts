import {TUser} from '@/models';
import {User} from '@/types/User';

export const listBuilder = (user: TUser): User.ListBuilder => ({
  _id: user._id,
  email: user.email,
  name: user.name,
  avatar: user.avatar,
  updatedAt: user.updatedAt,
  createdAt: user.createdAt,
  online: user.online,
});
