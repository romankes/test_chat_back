import {UserModelTypes} from '@/models';

export namespace UserService {
  export type Item = UserModelTypes.PublicItem;

  export type UpdateItem = {
    email?: string;
    username?: string;
    avatar?: string;
  };

  export type ResUpdateItem = Item;
  export type ResUpdateDeviceToken = Item;

  export type ResGetItems = {
    users: Item[];
    totalPage: number;
  };
}
