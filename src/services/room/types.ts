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

  export type ResGetItems = {rooms: Item[]; totalPage: number};

  export type ResGetDetail = {
    room: Item;
    messages: MessageModelTypes.PublicItem[];
  };
}
