export namespace RoomModelTypes {
  export type Item = {
    title: string;
    _id: string;
    admin: string;
    users: string[];
  };

  export type CreatePayload = {
    title: string;
    admin: string;
    users: string[];
  };
}
