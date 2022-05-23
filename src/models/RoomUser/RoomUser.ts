import {model, Schema} from 'mongoose';
const RoomUserSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: 'User id required',
    },
    room_id: {
      type: Schema.Types.ObjectId,
      required: 'User id required',
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {timestamps: true},
);
export const RoomUserModel = model('RoomUser', RoomUserSchema);
