import {TUser} from '@/models';
import {User} from '@/types/User';

export const showBuilder = (user: TUser): User.ShowBuilder => ({
  _id: user._id,
  email: user.email,
  name: user.name,
  avatar: user.avatar,
  updatedAt: user.updatedAt,
  online: user.online,
});
