import {UserModelTypes} from '@/models';

export namespace Room {
  export type GetRoomsRes = {
    room: UserModelTypes.Item;
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

  export type Item = {
    title: string;
    _id: string;
    admin: string;
    users: string[];
  };

  export type CreateRoomBody = {
    users: string[];
    title: string;
    role: string;
  };

  export type CreateRoomRes = {
    room: Item | null;
  };

  export type GetRoomParams = {
    id: string;
  };
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
