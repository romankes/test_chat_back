import {UserModelTypes} from '@/models';

export namespace UserService {
  export type Item = UserModelTypes.PublicItem;

  export type UpdateItem = {
    email?: string;
    name?: string;
    avatar?: string;
  };

  export type ResUpdateItem = Item;
  export type ResUpdateDeviceToken = Item;

  export type ResGetItems = {
    items: Item[];
    totalPage: number;
  };
}
