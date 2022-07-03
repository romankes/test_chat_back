import {number, object, string} from 'yup';

export const listSchema = object({
  query: object({
    page: number().required(),
    per: number().required(),
    name: string().required(),
  }),
});
