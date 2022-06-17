import {RoomModelTypes} from '@/models';
import {UserForRes} from '@/types';

export type TRoomBuilder = {
  _id: string;
  title: string;
  avatar: string;
  admin: string;
  users: UserForRes[];
};

export const roomBuilder = (room: RoomModelTypes.PublicItem): TRoomBuilder => ({
  _id: room._id,
  admin: room.admin,
  avatar: room.avatar,
  title: room.title,
  users: room.users.map((user) => ({
    _id: user._id,
    avatar: user.avatar,
    email: user.email,
    name: user.name,
    online: user.online,
    role: user.role,
    updatedAt: user.updatedAt,
  })),
});
