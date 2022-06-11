export namespace MessageModelTypes {
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
