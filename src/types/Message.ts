import {App} from './App';
import {User} from './User';

export namespace Message {
  export type RemoveParams = {
    id: App.Id;
  };

  export type CreateBody = {
    text: string;
    roomId: App.Id;
  };

  export type ListBuilder = {
    _id: string;
    notRead: App.Id[];
    text: string;
    room: string;
    user: User.ShowBuilder;
    updatedAt: string;
  };
}
