import {sendPush} from '@/helpers/sendPush';
import {db} from '@/models';
import {Server} from 'socket.io';
import {TCreateMessageData} from './types';

export const createMessage = async (
  data: TCreateMessageData,
  io: Server,
): Promise<any> => {
  const room = await db.room.getRoom(data.room);
  if (room) {
    const message = await db.message.create(data);

    const users = await db.room.getAllUsersByRoom(data.room);

    await Promise.all(
      users.map(async ({_id, socket_id, deviceToken}) => {
        if (!_id.equals(data.user) && socket_id) {
          console.log(socket_id);

          io.to(socket_id).emit('create_message', message);
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
