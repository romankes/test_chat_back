import {UserModelTypes} from '@/models';

export type CurrentUser = {user: UserModelTypes.Model};

export type UserForRes = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  online: boolean;
  updatedAt: string;
  role: 'user' | 'admin';
};
