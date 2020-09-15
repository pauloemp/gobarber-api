import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import routes from './routes';
import globalExceptionHandler from './middlewares/global-exception-handler.middleware';
import uploadConfig from '../../config/upload';

import '../infra/typeorm';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(globalExceptionHandler);

export default app;
