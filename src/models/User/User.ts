import {model, Schema} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
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
    socket_id: {
      type: String,
      default: '',
    },
  },
  {timestamps: true},
);
UserSchema.plugin(mongoosePaginate);
export const UserModel = model('User', UserSchema);
