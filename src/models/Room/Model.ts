import {model, Schema} from 'mongoose';
import {TRoom} from './types';
const RoomSchema = new Schema(
  {
    title: {
      type: String,
      default: '',
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    admin: {
      type: Schema.Types.ObjectId,
    },
    avatar: {
      type: String,
      default: '',
    },
  },
  {timestamps: true},
);
export const RoomModel = model<TRoom>('Room', RoomSchema);
