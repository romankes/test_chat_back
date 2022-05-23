import {model, Schema} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const RoomSchema = new Schema(
  {
    title: {
      type: String,
      default: '',
    },
  },
  {timestamps: true},
);
RoomSchema.plugin(mongoosePaginate);
export const RoomModel = model('Room', RoomSchema);
