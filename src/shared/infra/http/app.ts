import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import uploadConfig from '@config/upload';
import globalExceptionHandler from '@shared/infra/http/middlewares/global-exception-handler.middleware';

import routes from './routes';

import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(globalExceptionHandler);

export default app;
