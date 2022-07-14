import PersistentFile from 'formidable/PersistentFile';
import {App} from './App';
import {User} from './User';

export namespace Message {
  export type RemoveParams = {
    id: App.Id;
  };

  export type CreateBody = {
    text: string;
    roomId: App.Id;

    image?: string;
  };

  export type Image = {
    image: PersistentFile;
  };

  export type ListBuilder = {
    _id: string;
    notRead: App.Id[];
    text: string;
    room: App.Id;
    user: User.ShowBuilder;
    updatedAt: string;
    createdAt: string;

    image: string | null;
  };
}
