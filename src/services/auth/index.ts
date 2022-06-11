import {TResSignIn, TResSignUp, TSignIn, TSignUp} from './types';

import {db} from '@/models';
import {compare, compareSync, hash} from 'bcryptjs';
import {sign} from 'jsonwebtoken';

export const signIn = async (data: TSignIn): Promise<TResSignIn | null> => {
  const user = await db.user.exist(data.email);

  if (user) {
    const checker = compare(data.password, user.password);

    if (checker) {
      const token = sign({data: user}, 'MySuP3R_z3kr3t', {
        expiresIn: '6h',
      });

      await db.user.update(user._id, {token});

      return token;
    }
  }

  return null;
};

export const signUp = async (data: TSignUp): Promise<TResSignUp | null> => {
  const isExist = await db.user.exist(data.email);

  if (!isExist) {
    const passwordHash = await hash(data.password, 'chat chat');

    const user = await db.user.create({
      email: data.email,
      password: passwordHash,
    });

    const token = sign({data: user}, 'MySuP3R_z3kr3t', {
      expiresIn: '6h',
    });

    await db.user.update(user._id, {token});

    return token;
  }

  return null;
};
