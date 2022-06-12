import admin from 'firebase-admin';
import {ENV} from '@/configs';

const serviceAccount = require(ENV.PRIVATE_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

type TMessage = {
  title: string;
  body: string;
};

export type TData = {
  action: 'CREATE_MESSAGE';
  [key: string]: any;
};

export const sendPush = async (
  token: string,
  notification: TMessage,
  data: TData,
) => {
  try {
    const message = await admin.messaging().send({
      token,
      notification,
      data,
    });

    return message;
  } catch (e) {
    console.log(`error send push ${e}`);
  }
};
