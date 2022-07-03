import {array, object, string} from 'yup';

export const removeSchema = object({
  params: object({
    id: string().required(),
  }),
});
