import {NotReadMessageModel} from './NotReadMessage';

export const getAllItemByRoom = async (
  roomId: string,
  userId: string,
): Promise<any> => {
  const messages = await NotReadMessageModel.find({
    room: roomId,
    users: {$in: userId},
  });

  return messages.map((message) => message.toJSON());
};

export const create = async (
  users: string[],
  room: string,
  message: string,
): Promise<any> => {
  const doc = new NotReadMessageModel({
    users,
    room,
    message,
  });

  await doc.save();

  return doc;
};

export const read = async (user: string, room: string): Promise<any> => {
  const docs = await NotReadMessageModel.find({room, users: {$in: user}});
  const messages = await Promise.all(
    docs.map(async (doc) => {
      await NotReadMessageModel.findByIdAndUpdate(doc._id, {
        $pull: {users: user},
      });
      const message = doc.toJSON();
      return {
        ...message,
        users: message.users.filter((id) => user !== id),
      };
    }),
  );

  await Promise.all(
    messages.map(async (message) => {
      if (!message.users.length) {
        await NotReadMessageModel.findByIdAndRemove(message._id);
      }

      return message;
    }),
  );

  return messages;
};
