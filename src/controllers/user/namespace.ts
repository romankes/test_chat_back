import {UserModelTypes} from '@/models';

export namespace User {
  export type Item = UserModelTypes.PublicItem;

  export type GetDetailRes = {
    user: Item;
  };

  export type UpdateItemBody = {
    username: string;
  };
  export type ResUpdateItem = {user: Item};

  export type UpdateDeviceTokenBody = {
    token: string;
  };

  export type GetItemsParams = {
    page: number;
    per: number;
    username: string;
  };

  export type ResGetItems = {
    users: Item[];
  };
}
