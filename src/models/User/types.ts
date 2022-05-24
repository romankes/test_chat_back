export namespace NUserModel {
  export type Item = {
    email: string;
    name: string;
    _id: string;
    avatar: string;
    online: boolean;
    token: string;
    socket_id: string;

    updatedAt: string;

    rooms: string[];
  };
}
