import {model, Schema} from 'mongoose';
import {TMessage} from './types';

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
    image: {
      type: String,
      default: null,
    },
    notRead: [String],
  },
  {timestamps: true},
);

export const MessageModel = model<TMessage>('Message', MessageSchema);
