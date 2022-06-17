import {MessageModelTypes, RoomModelTypes, UserModelTypes} from '@/models';

export namespace RoomService {
  export type Item = RoomModelTypes.PublicItem;

  export type CreateItem = {
    title: string;
    users: string[];
    admin: string;
    avatar: string;
  };

  export type ResCreateItem = Item;

  export type ResGetItems = {items: Item[]; totalPage: number};

  export type ResGetDetail = {
    item: Item;
    messages: MessageModelTypes.PublicItem[];
  };
}
