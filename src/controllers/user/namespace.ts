import {NUserModel} from '../../models';

export namespace User {
  export type GetUserRes = {
    user: NUserModel.Item;
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
