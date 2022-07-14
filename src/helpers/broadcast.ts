import {Server} from 'socket.io';

type TEvent =
  | 'CREATE_ROOM'
  | 'REMOVE_ROOM'
  | 'REMOVE_USER'
  | 'REMOVE_MESSAGE'
  | 'LEAVE_USER'
  | 'CREATE_MESSAGE';

type TData = {
  event: TEvent;
  data: any;
};

export const broadcast = (io: Server, ids: string[], {event, data}: TData) => {
  ids.forEach((id) => {
    if (id) {
      io.to(id).emit(event, data);
    }
  });
};
