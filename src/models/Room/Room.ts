import {model, Schema} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import {RoomModelTypes} from './types';
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
  },
  {timestamps: true},
);
RoomSchema.plugin(mongoosePaginate);
export const RoomModel = model<RoomModelTypes.Item>('Room', RoomSchema);
