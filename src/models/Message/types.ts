export namespace MessageModelTypes {
  export type User = {
    name: string;
    _id: string;
    email: string;
    online: boolean;
    updatedAt: string;
    avatar: string;
    role: 'user' | 'admin';
  };

  export type PublicItem = {
    text: string;
    room: string;
    user: User;
    _id: string;
  };

  export type Item = {
    text: string;
    room: string;
    user: string;
    _id: string;
  };

  export type CreateItemPayload = {
    text?: string;
    room: string;
    user: string;
  };
}
