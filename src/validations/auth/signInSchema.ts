import {object, string} from 'yup';

export const signInSchema = object({
  body: object({
    user: object({
      email: string().email().required(),
      password: string().required(),
    }),
  }),
});
