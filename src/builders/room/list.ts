import {TRoom, TUser} from '@/models';
import {Room} from '@/types';

export const listBuilder = (room: TRoom<TUser>): Room.ListBuilder => ({
  _id: room._id,
  admin: room.admin,
  avatar: room.avatar,
  title: room.title,
  updatedAt: room.updatedAt,
  createdAt: room.createdAt,
  notReadCount: room?.notReadCount || 0,
  users: room.users.map((user) => ({
    _id: user._id,
    avatar: user.avatar,
    email: user.email,
    name: user.name,
    online: user.online,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  })),
});
