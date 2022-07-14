import {
  TParamsList,
  TRemoveParams,
  TReturnList,
  TParamsUpdate,
  TReturnUpdate,
} from './types';

import logger from 'jet-logger';
import {RoomModel, TRoom, TUser, UserModel} from '@/models';
import {userBuilders} from '@/builders';
import {broadcast, sendPush} from '@/helpers';

export const remove = async ({
  id,
  io,
}: TRemoveParams): Promise<TUser | null> => {
  try {
    const docs = (await RoomModel.updateMany(
      {users: id},
      {$pull: {users: id}},
    ).populate('users', 'socketId deviceToken')) as TRoom<TUser>[];

    const users = docs
      .flatMap(({users}) => users)
      .filter(
        ({_id}, i, arr) => arr.findIndex((user: any) => user._id === _id) === i,
      );

    broadcast(
      io,
      users.map(({socketId}) => socketId),
      {
        event: 'REMOVE_USER',
        data: {
          id,
        },
      },
    );

    await Promise.all([
      users.map(async ({deviceToken}) => {
        if (deviceToken) {
          await sendPush(
            deviceToken,
            {
              title: 'User remove',
              body: 'User removed',
            },
            {action: 'REMOVE_USER'},
          );
        }
      }),
    ]);

    //TODO: Rework user remove
    // const users = userDocs.filter(
    //   ({_id}: any, i: number, arr: any) =>
    //     arr.findIndex((user: any) => user._id === _id) === i,
    // );

    // console.log(users);

    // if (user) {
    //   return user;
    // }

    return null;
  } catch (e) {
    logger.err(`Remove user service ${e}`);

    return null;
  }
};

export const list = async ({
  page,
  per,
  name = '',
  initiator,
}: TParamsList): Promise<TReturnList | null> => {
  try {
    const docs = await UserModel.find(
      {
        name: {$regex: name, $options: 'i'},
        _id: {$ne: initiator},
      },
      '',
      {skip: (page - 1) * per, limit: per},
    );

    const users = docs.map((doc) =>
      userBuilders.listBuilder(doc.toJSON() as TUser),
    );

    const totalCount = await UserModel.countDocuments();

    return {
      users,
      totalCount,
    };
  } catch (e) {
    return null;
  }
};

export const update = async ({
  id,
  user,
}: TParamsUpdate): Promise<TReturnUpdate | null> => {
  try {
    const newUser = await UserModel.findByIdAndUpdate(id, user);

    if (!newUser) {
      return null;
    }

    //TODO: change return old user to new

    return userBuilders.showBuilder(newUser.toJSON() as TUser);
  } catch (e) {
    logger.err(`Update user service ${e}`);
    return null;
  }
};
