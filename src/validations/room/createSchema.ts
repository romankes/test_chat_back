import {array, object, string} from 'yup';

export const createSchema = object({
  body: object({
    room: object({
      users: array(),
      title: string(),
    }),
  }),
});
