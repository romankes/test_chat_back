export namespace RoomModelTypes {
  export type Item = {
    title: string;
    _id: string;
    admin: string;
    users: string[];
    avatar: string;
  };

  export type CreatePayload = {
    title: string;
    admin: string;
    users: string[];
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
    socket_id: string;
    deviceToken: string;
  };

  export type PublicItem = {
    _id: string;
    title: string;
    users: User[];
    admin: string;
  };
}
