export namespace RoomModelTypes {
  export type Model = {
    title: string;
    _id: string;
    admin: string;
    users: string[];
    avatar: string;
  };

  export type PublicItem = {
    _id: string;
    title: string;
    users: User[];
    admin: string;
    avatar: string;
  };

  export type User = {
    name: string;
    _id: string;
    email: string;
    online: boolean;
    updatedAt: string;
    avatar: string;
    role: 'user' | 'admin';
    socketId: string;
    deviceToken: string;

    currentRoom: string;
  };

  export type CreatePayload = {
    title: string;
    admin: string;
    users: string[];
    avatar?: string;
  };

  export type ResGetItems = {
    totalPage: number;
    items: PublicItem[];
  };

  export type ResLeave = {
    room: Model;
    command: 'remove' | 'leave';
  };
}
