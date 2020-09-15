import 'reflect-metadata';

import express from 'express';

import routes from './routes';
import uploadConfig from '../../config/upload';

import '../infra/typeorm';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

export default app;
