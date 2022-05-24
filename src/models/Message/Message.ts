import {model, Schema} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import {NMessageModel} from './types';
const MessageSchema = new Schema(
  {
    text: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    room: {
      type: Schema.Types.ObjectId,
    },
  },
  {timestamps: true},
);
MessageSchema.plugin(mongoosePaginate);
export const MessageModel = model<NMessageModel.Item>('Message', MessageSchema);
