import {model, Schema} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import {UserModelTypes} from './types';
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
    token: {
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
      default: String,
    },
  },
  {timestamps: true},
);
UserSchema.plugin(mongoosePaginate);
export const UserModel = model<UserModelTypes.Model>('User', UserSchema);
