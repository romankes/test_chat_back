import PersistentFile from 'formidable/PersistentFile';
import {App} from './App';

export namespace User {
  export type ListQueries = {
    page: number;
    per: number;
    name: string;
  };

  export type ShowBuilder = ListBuilder & {};

  export type ListBuilder = {
    _id: App.Id;
    email: string;
    online: boolean;
    updatedAt: string;
    avatar: string;
    name: string;

    createdAt: string;
  };

  export type UpdateBody = {
    deviceToken?: string;
    name?: string;
    avatar?: string;
    currentRoom?: string;
  };

  export type Avatar = {
    avatar: PersistentFile;
  };
}
