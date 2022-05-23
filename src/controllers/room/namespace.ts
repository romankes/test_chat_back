import {NRoomModel, NRoomUserModel, NUserModel} from '@/models';

export namespace Room {
  export type GetRoomsRes = {
    room: NUserModel.Item;
  };

  export type CreateRoomBody = {
    user_ids: string[];
    title: string;
    role: string;
  };

  //   //TODO: add typing for user; add typing

  export type CreateRoomRes = any;
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
