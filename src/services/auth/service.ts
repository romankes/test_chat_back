import {handleError, jwt, errors} from '@/helpers';
import {UserModel} from '@/models';
import logger from 'jet-logger';

import bcrypt from 'bcrypt';

import {TSignInPayload, TSignUpPayload} from './types';

export const signIn = async (data: TSignInPayload): Promise<string | null> => {
  try {
    const user = await UserModel.findOne({email: data.email});

    const validPassword = await bcrypt.compare(data.password, user.password);

    if (validPassword) {
      const token = await jwt.sign({
        _id: user._id,
        email: user.email,
        password: user.password,
      });

      return token;
    }

    return null;
  } catch (e) {
    logger.err(`Sign in service ${e}`);
  }
};

export const signUp = async (data: TSignUpPayload): Promise<string | null> => {
  try {
    const isExists = await UserModel.exists({email: data.email});

    if (!isExists) {
      const passwordHash = await bcrypt.hash(data.password, 3);

      const user = await UserModel.create({
        email: data.email,
        password: passwordHash,
      });

      const token = await jwt.sign({
        _id: user._id,
        email: user.email,
        password: user.password,
      });

      return token;
    }

    return null;
  } catch (e) {
    logger.err(`Sign up service ${e}`);
  }
};
