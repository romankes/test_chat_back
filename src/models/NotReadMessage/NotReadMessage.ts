import {model, Schema} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import {NotReadMessageModelTypes} from './types';
const NotReadMessageSchema = new Schema(
  {
    text: String,
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    room: {
      type: Schema.Types.ObjectId,
      required: 'RoomId is required',
    },
    message: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
      required: 'MessageId is required',
    },
  },
  {timestamps: true},
);
NotReadMessageSchema.plugin(mongoosePaginate);
export const NotReadMessageModel = model<NotReadMessageModelTypes.Model>(
  'NotReadMessage',
  NotReadMessageSchema,
);
