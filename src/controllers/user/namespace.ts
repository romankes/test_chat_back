import {TUserBuilder} from '@/builders';

export namespace User {
  export type GetDetailRes = {
    user: TUserBuilder;
  };

  export type UpdateItemBody = {
    name: string;
  };
  export type ResUpdateItem = {user: TUserBuilder};

  export type UpdateDeviceTokenBody = {
    token: string;
  };

  export type GetItemsParams = {
    page: number;
    per: number;
    name: string;
  };

  export type ResGetItems = {
    users: TUserBuilder[];
    totalPage: number;
  };
}
