import {RoomModelTypes, UserModelTypes} from '@/models';

export type TCreateRoom = {
  title: string;
  users: string[];
  admin: string;
};

export type TResCreateRoom = {
  title: string;
  users: UserModelTypes.Item[];
  admin: string;
};

export type TResGetRooms = {
  rooms: RoomModelTypes.Item[];
  totalPage: number;
};
