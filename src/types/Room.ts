import PersistentFile from 'formidable/PersistentFile';
import {App} from './App';
import {Message} from './Message';
import {User} from './User';

export namespace Room {
  export type Item<T = ListBuilder> = T &
    (
      | {
          message: Message.ListBuilder | null;
        }
      | {
          messages: Message.ListBuilder[];
        }
    );

  export type CreateBody = {
    room: {
      title: string;
      users: string[];
      admin: App.Id;
      avatar?: string;
    };
  };

  export type Avatar = {
    avatar: PersistentFile;
  };

  export type CreateRes = {
    room: ListBuilder;
  };

  export type ListParams = {
    page: number;
    per: number;
    title: string;
  };

  export type ListBuilder = {
    _id: App.Id;
    admin: App.Id;
    title: string;
    avatar: string;
    updatedAt: string;
    users: User.ShowBuilder[];
    createdAt: string;
    notReadCount: number;
  };

  export type ShowBuilder = ListBuilder & {};

  export type ListRes = {
    rooms: ListBuilder[];
    totalCount: number;
  };

  export type ShowParams = {
    id: App.Id;
  };

  export type ShowRes = {
    room: Item<ShowBuilder>;
  };

  export type RemoveParams = {
    id: App.Id;
  };
}
