import {sendPush} from '@/helpers/sendPush';
import {db} from '@/models';
import {Server} from 'socket.io';
import {MessageService} from './types';

export const createMessage = async (
  data: MessageService.CreateMessageData,
  io: Server,
): Promise<MessageService.Item | null> => {
  const room = await db.room.getDetail(data.room);
  if (room) {
    const message = await db.message.create(data);

    const users = await db.room.getUsersByItem(data.room);

    await Promise.all(
      users.map(async ({_id, socket_id, deviceToken}) => {
        if (!_id.equals(data.user) && socket_id) {
          io.to(socket_id).emit('CREATE_MESSAGE', message);
        }

        if (!_id.equals(data.user) && deviceToken) {
          await sendPush(
            deviceToken,
            {
              title: room.title,
              body: message.text,
            },
            {
              action: 'CREATE_MESSAGE',
              roomId: room._id.toString(),
            },
          );
        }
      }),
    );

    const usersNotRead = users
      .filter(
        (user) =>
          user._id.toString() !== data.user && user.currentRoom !== data.room,
      )
      .map(({_id}) => _id);

    await db.notReadMessage.create(usersNotRead, data.room, message._id);

    return message;
  }

  return null;
};

export const removeItem = async (
  id: string,
  currentUser: string,
  io: Server,
): Promise<MessageService.Item | null> => {
  const message = await db.message.getItemById(id);

  if (message && message.user.equals(currentUser)) {
    const users = await db.room.getUsersByItem(message.room);

    await db.message.remove(id);
    await db.notReadMessage.remove(id);

    users.forEach(({socket_id, _id}) => {
      if (socket_id && _id !== currentUser) {
        io.to(socket_id).emit('REMOVE_MESSAGE', {
          roomId: message.room,
          id: message._id,
        });
      }
    });

    return message;
  }

  return null;
};
