import 'module-alias/register';

import mongoose from 'mongoose';
import express from 'express';

import morgan from 'morgan';
import cors from 'cors';

import * as Routes from '@/routes';
import {connectionController} from '@/controllers';
import {loginMiddleware} from '@/middlewares';

import {Server} from 'socket.io';

import {createServer} from 'http';

const PORT = 3001;
const HOST = '192.168.0.104';

const app = express();
const server = createServer(app);

const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));
app.use(express.urlencoded({extended: true}));

morgan.token('body', (req: any) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :body - :response-time ms '));
mongoose.connect('mongodb://localhost:27017/chat_test');

app.use('/auth', Routes.auth);
app.use('/user', loginMiddleware.validateToken, Routes.user);
app.use('/', Routes.socket(io));
app.use('/uploads/users/:filename', (req, res) => {
  console.log(`${__dirname}\\uploads\\users\\${req.params.filename}`);

  res.sendFile(`${__dirname}\\uploads\\users\\${req.params.filename}`);
});
app.use('/uploads/rooms/:filename', (req, res) => {
  console.log(`${__dirname}\\uploads\\rooms\\${req.params.filename}`);

  res.sendFile(`${__dirname}\\uploads\\rooms\\${req.params.filename}`);
});
io.on('connection', (socket) => {
  connectionController.connect(socket);

  socket.on('disconnect', () => connectionController.disconnect(socket));
});

server.listen(PORT, HOST, () => {
  console.log(`Example app listening at http://${HOST}:${PORT}`);
});
