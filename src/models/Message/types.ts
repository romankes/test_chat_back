export namespace MessageModelTypes {
  export type Model = {
    text: string;
    room: string;
    user: string;
    _id: string;
  };

  export type User = {
    name: string;
    _id: string;
    email: string;
    online: boolean;
    updatedAt: string;
    avatar: string;
    role: 'user' | 'admin';

    deviceToken: string;
    socketId: string;
  };

  export type PublicItem = {
    text: string;
    room: string;
    user: User;
    _id: string;
  };

  export type CreateItemPayload = {
    text?: string;
    room: string;
    user: string;
  };
}
