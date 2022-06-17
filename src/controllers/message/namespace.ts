import {TMessageBuilder} from '@/builders';
import {UserModelTypes} from '@/models';

export namespace Message {
  export type CreateItemBody = {
    text: string;
    room_id: string;
  };

  export type ResCreateItem = {
    message: TMessageBuilder;
  };

  export type RemoveItemParams = {
    id: string;
  };
  export type ResRemoveItem = {
    message: string;
  };
}
