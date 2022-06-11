import {UserModelTypes} from '@/models';

export namespace Message {
  export type CreateMessageBody = {
    text: string;
    room_id: string;
  };

  export type User = {
    name: string;
    _id: string;
    email: string;
    online: boolean;
    updatedAt: string;
    avatar: string;
    role: 'user' | 'admin';
  };

  // export type CreateRoomBody = {
  //   user_ids: string[];
  //   title: string;
  //   role: string;
  // };

  // export type CreateRoomRes = {
  //   room: Item | null;
  // };
  // {
  // room: {
  //   _id: string;
  //   title: string;
  //   user: any[];
  // } | null;
  // };
  //   export type UpdateUserBody = {
  //     name: string;
  //     email: string;
  //     phone: string;
  //     password: string;
  //   };
  //   export type GetUsersParams = {
  //     perPage: number;
  //     page: number;
  //   };

  //   export type GetUsersRes = {
  //     page: number;
  //     totalPage: number;
  //     users: NUserModel.Item[];
  //   };
}
