import {UserModelTypes} from '@/models';

export namespace Message {
  export type Item = {
    text: string;
    user: User;
    room: string;
  };

  export type User = {
    name: string;
    _id: string;
    email: string;
    online: boolean;
    updatedAt: string;
    avatar: string;
    role: 'user' | 'admin';
  };

  export type CreateItemBody = {
    text: string;
    room_id: string;
  };

  export type ResCreateItem = {
    message: Item;
  };

  export type RemoveItemParams = {
    id: string;
  };
  export type ResRemoveItem = {
    message: Item;
  };
}
