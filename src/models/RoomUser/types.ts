export namespace NRoomUserModel {
  export type Item = {
    role: 'user' | 'admin';
    room_id: string;
    user_id: string;
    _id: string;
  };
}
