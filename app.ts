import mongoose from 'mongoose';
import express from 'express';

import morgan from 'morgan';
import cors from 'cors';

import * as Routes from './src/routes';

import {loginMiddleware} from './src/middlewares';

// morgan();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

morgan.token('body', (req: any) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :body - :response-time ms '));
// app.use(morgan('tiny'));
mongoose.connect('mongodb://localhost:27017/chat_test');

app.use('/auth', Routes.auth);
app.use('/user', loginMiddleware.validateToken, Routes.user);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Example app listening at http://127.0.0.1:${PORT}`);
});
