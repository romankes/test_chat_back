import {Router} from 'express';
import {authController} from '@/controllers';
import {validate} from '@/helpers';
import {authSchema} from '@/validations';

const authRoutes = Router();

authRoutes.post(
  '/signIn',
  validate(authSchema.signInSchema),
  authController.signIn,
);
authRoutes.post(
  '/signUp',
  validate(authSchema.signUpSchema),
  authController.signUp,
);

export {authRoutes};
