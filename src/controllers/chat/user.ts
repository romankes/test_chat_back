import {Socket} from 'socket.io';
import {UserModel} from '../../models';

export const disconect = async (socket: Socket) => {
  const {id} = socket;

  const user = await UserModel.findOneAndUpdate(
    {socket_id: id},
    {socket_id: '', online: false},
  );

  console.log(user);
};
