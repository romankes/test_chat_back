import {UserModelTypes} from '@/models';

export type TUserBuilder = {
  email: string;
  name: string;
  avatar: string;
  _id: string;
  online: boolean;
  updatedAt: string;
};

export const userBuilded = (user: UserModelTypes.PublicItem): TUserBuilder => ({
  _id: user._id,
  avatar: user.avatar,
  email: user.email,
  name: user.name,
  online: user.online,
  updatedAt: user.updatedAt,
});
