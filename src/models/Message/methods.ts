import {MessageModel} from './Message';
import {MessageModelTypes} from './types';

//TODO: add typing

export const getMessagesByRoom = async (roomId: string): Promise<any[]> => {
  const messages = await MessageModel.find({room: roomId}, '-room').populate(
    'user',
    '-rooms -token -password -socket_id -__v -createdAt',
  );

  return messages.map((message) => message.toJSON());
};

export const removeAllByRoomId = async (roomId: string): Promise<string> => {
  await MessageModel.deleteMany({room: roomId});

  return roomId;
};

export const getLastMessageByRoom = async (roomId: string): Promise<any> => {
  const message = await MessageModel.findOne(
    {room: roomId},
    {},
    {sort: {created_at: -1}},
  ).populate('user', '-rooms -token -password -socket_id -__v -createdAt');

  return message;
};

//TODO: add typescript
export const create = async (
  data: MessageModelTypes.CreateItemPayload,
): Promise<MessageModelTypes.Item> => {
  const doc = new MessageModel({...data});

  await doc.save();

  const message = await doc.populate(
    'user',
    '-rooms -token -password -socket_id -__v -createdAt',
  );

  return message.toJSON();
};
