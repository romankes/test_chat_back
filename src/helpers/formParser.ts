import {App} from '@/types';
import {IncomingForm} from 'formidable';

import path from 'path';
import fs from 'fs';

import logger from 'jet-logger';

import {ENV} from '@/configs';

type TArgs<B> = {
  req: App.BaseRequest<B>;
  fullPath: string[];
};

type TReturn<F, B> = Promise<{
  files: F;
  fields: B;
}>;

export const formParser = async <B = {}, F = {}>({
  fullPath,
  req,
}: TArgs<B>): TReturn<F, B> => {
  const FILE_PATH = path.join(ENV.FILE_PATH, ...fullPath);

  if (!fs.existsSync(FILE_PATH)) {
    fs.mkdirSync(FILE_PATH);
  }

  const form = new IncomingForm({
    uploadDir: FILE_PATH,
    multiples: true,
    keepExtensions: true,
  });

  return await new Promise((res, rej) => {
    try {
      form.parse(req, (e, fields, files: any) => {
        if (!e) {
          //   for (let key in files) {
          //     if (!files[key]?.length) {
          //       const file;
          //     }
          //   }

          res({fields: fields as unknown as B, files: files as unknown as F});
        }

        logger.err(`Parse form data ${e}`);
        res({fields: req.body, files: {} as F});
      });
    } catch (e) {
      logger.err(`Parse form data ${e}`);
      rej(e);
    }
  });
};
