import {model, Schema} from 'mongoose';
import {TUser} from './types';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: 'Email is required',
    },
    password: {
      type: String,
      required: 'Password is required',
    },
    online: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    socketId: {
      type: String,
      default: '',
    },
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Room',
      },
    ],
    currentRoom: {
      type: String,
      default: '',
    },
    deviceToken: {
      type: String,
      default: '',
    },
  },
  {timestamps: true},
);
export const UserModel = model<TUser>('User', UserSchema);
