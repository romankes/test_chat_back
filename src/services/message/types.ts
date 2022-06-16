import {MessageModelTypes} from '@/models';

export namespace MessageService {
  export type CreateMessageData = {
    text?: string;
    room: string;
    user: string;
  };

  export type Item = MessageModelTypes.PublicItem;
}
