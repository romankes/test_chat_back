import {model, Schema} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const MessageSchema = new Schema(
  {
    text: String,
    file: String,
    image: String,
  },
  {timestamps: true},
);
MessageSchema.plugin(mongoosePaginate);
export const MessageModel = model('Message', MessageSchema);
