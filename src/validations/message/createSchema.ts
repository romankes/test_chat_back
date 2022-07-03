import {array, object, string} from 'yup';

export const createSchema = object({
  body: object({
    text: string().required(),
    roomId: string().required(),
  }),
});
