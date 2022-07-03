import {object, string} from 'yup';

export const showSchema = object({
  params: object({
    id: string().required(),
  }),
});
