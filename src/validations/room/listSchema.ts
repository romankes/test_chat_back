import {number, object, string} from 'yup';

export const listSchema = object({
  query: object({
    page: number(),
    per: number(),
    name: string(),
  }),
});
