import {object, string} from 'yup';

export const signUpSchema = object({
  body: object({
    user: object({
      email: string().email().required(),
      password: string().required(),
    }),
  }),
});
