export namespace UserModelTypes {
  export type Model = {
    email: string;
    name: string;
    _id: string;
    avatar: string;
    online: boolean;
    token: string;
    socketId: string;
    password: string;
    updatedAt: string;

    rooms: string[];

    currentRoom: string;
    deviceToken: string;
  };

  export type ItemPayload = {
    email?: string;
    name?: string;
    avatar?: string;
  };

  export type PublicItem = {
    email: string;
    name: string;
    _id: string;
    avatar: string;
    online: boolean;
    updatedAt: string;

    socketId: string;
    deviceToken: string;
  };

  export type ResGetItems = {
    items: PublicItem[];
    totalPage: number;
  };
}
