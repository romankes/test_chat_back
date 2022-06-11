import {UserModelTypes} from '@/models';

export namespace User {
  export type GetUserRes = {
    user: UserModelTypes.Item;
  };

  export type UpdateUserBody = {
    username: string;
  };

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
