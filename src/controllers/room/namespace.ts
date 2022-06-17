import {TRoomBuilder} from './../../builders/room';
import {MessageModelTypes, RoomModelTypes, UserModelTypes} from '@/models';
import {TMessageBuilder} from '@/builders';

export namespace Room {
  export type CreateItemBody = {
    users: string[];
    title: string;
    role: string;
  };

  export type ResCreateItem = {
    room: TRoomBuilder;
  };

  export type CreateItemRes = {
    room: TRoomBuilder | null;
  };

  export type GetDetailParams = {
    id: string;
  };
  export type ResGetDetail = {
    room: TRoomBuilder;
    messages: TMessageBuilder[];
  };

  export type ResGetItems = {
    rooms: TRoomBuilder[];
    totalPage: number;
  };

  export type RemoveItemParams = {
    id: string;
  };
}
