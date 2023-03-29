import 'express-async-errors';
import express from 'express';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { routes } from './routes';
import 'dotenv/config';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(routes);

server.use(errorMiddleware);

server.listen(3003, () => {
  console.log('Server is running');
});
