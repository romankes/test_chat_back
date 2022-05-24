import {HydratedDocument} from 'mongoose';

export const saveDocument = async <T>(
  document: HydratedDocument<T>,
): Promise<T> => {
  await document.save();

  return (await document.toJSON()) as T;
};
