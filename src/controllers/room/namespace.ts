import {MessageModelTypes, RoomModelTypes, UserModelTypes} from '@/models';

export namespace Room {
  export type Item = RoomModelTypes.PublicItem;

  export type CreateItemBody = {
    users: string[];
    title: string;
    role: string;
  };

  export type ResCreateItem = {
    room: Item;
  };

  export type CreateItemRes = {
    room: Item | null;
  };

  export type GetDetailParams = {
    id: string;
  };
  export type ResGetDetail = {
    room: Item;
    messages: MessageModelTypes.PublicItem[];
  };

  export type ResGetItems = {
    rooms: Item[];
    totalPage: number;
  };

  export type RemoveItemParams = {
    id: string;
  };
}
