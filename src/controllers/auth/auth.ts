import {Request, Response} from 'express';
import {UserModel, NUserModel} from '@/models';
import {Auth} from './namespace';
import {compareSync, hashSync} from 'bcryptjs';
import {sign} from 'jsonwebtoken';

export const signIn = async (
  req: Request<{}, {}, Auth.SignInBody>,
  res: Response<Auth.SignInRes>,
) => {
  try {
    const {email, password} = req.body;

    console.log(req.body);

    const user = (await UserModel.findOne({email})) as any;

    if (user) {
      const checker = compareSync(password, user.password);

      if (checker) {
        const token = sign({data: user}, 'MySuP3R_z3kr3t', {
          expiresIn: '6h',
        });

        await UserModel.findByIdAndUpdate(user._id, {token});

        res.status(200).send({token});
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    console.log(`error sign in action ${e}`);
    res.sendStatus(422);
  }
};
export const signUp = async (
  req: Request<{}, {}, Auth.SignUpBody>,
  res: Response<Auth.SignUpRes>,
) => {
  try {
    const {email, password} = req.body;

    const isExist = await UserModel.exists({email});

    if (!isExist) {
      const passwordHash = hashSync(password);

      const user = new UserModel({email, password: passwordHash});

      await user.save();

      const token = sign({data: user}, 'MySuP3R_z3kr3t', {
        expiresIn: '6h',
      });

      await UserModel.findByIdAndUpdate(user._id, {token});

      res.status(200).send({token});
    } else {
      res.sendStatus(422);
    }
  } catch (e) {
    console.log(`error sign up action ${e}`);
    res.sendStatus(422);
  }
};
