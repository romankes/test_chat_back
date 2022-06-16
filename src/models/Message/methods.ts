import {MessageModel} from './Message';
import {MessageModelTypes} from './types';

export const getItemsByRoom = async (
  roomId: string,
): Promise<MessageModelTypes.PublicItem[]> => {
  const messages = (await MessageModel.find({room: roomId}, '-room').populate(
    'user',
    '-rooms -token -password -socket_id -__v -createdAt -currentRoom -deviceToken',
  )) as MessageModelTypes.PublicItem[];

  return messages;
};

export const removeItemsByRoomId = async (roomId: string): Promise<string> => {
  await MessageModel.deleteMany({room: roomId});

  return roomId;
};

export const getLastItemByRoom = async (
  roomId: string,
): Promise<MessageModelTypes.PublicItem> => {
  const message = (await MessageModel.findOne(
    {room: roomId},
    {},
    {sort: {created_at: -1}},
  ).populate(
    'user',
    '-rooms -token -password -socket_id -__v -createdAt -currentRoom -deviceToken',
  )) as MessageModelTypes.PublicItem;

  return message;
};

export const create = async (
  data: MessageModelTypes.CreateItemPayload,
): Promise<MessageModelTypes.PublicItem> => {
  const doc = new MessageModel({...data});

  await doc.save();

  const message = (await doc.populate(
    'user',
    '-rooms -token -password -socket_id -__v -createdAt -currentRoom -deviceToken',
  )) as MessageModelTypes.PublicItem;

  return message;
};

export const remove = async (id: string): Promise<MessageModelTypes.Item> => {
  const message = await MessageModel.findByIdAndRemove(id);

  return message;
};

export const getItemById = async (
  id: string,
): Promise<MessageModelTypes.Item> => {
  const message = await MessageModel.findById(id);

  return message;
};
