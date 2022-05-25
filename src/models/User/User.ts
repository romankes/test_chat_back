import {model, Schema} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import {NUserModel} from './types';
const UserSchema = new Schema(
  {
    username: {
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
    socket_id: {
      type: String,
      default: '',
    },
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Room',
      },
    ],
  },
  {timestamps: true},
);
UserSchema.plugin(mongoosePaginate);
export const UserModel = model<NUserModel.Item>('User', UserSchema);
