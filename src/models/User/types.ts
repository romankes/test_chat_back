export namespace UserModelTypes {
  export type Item = {
    email: string;
    username: string;
    _id: string;
    avatar: string;
    online: boolean;
    token: string;
    socket_id: string;
    password: string;
    updatedAt: string;

    rooms: string[];

    currentRoom: string;
    deviceToken: string;
  };

  export type PublicItem = {
    email: string;
    username: string;
    _id: string;
    avatar: string;
    online: boolean;
    updatedAt: string;

    deviceToken: string;
    socket_id: string;
  };

  export type UpdatePayload = {
    email?: string;
    username?: string;
    avatar?: string;
    online?: boolean;
    token?: string;
    socket_id?: string;
    password?: string;
    rooms?: string[];
  };

  export type CreatePayload = {
    email: string;
    password: string;
  };

  export type ResGetItems = {
    users: PublicItem[];
    totalPage: number;
  };
}
