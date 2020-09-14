import express from 'express';

import routes from './routes';
import '../infra/typeorm';

const app = express();

app.use(express.json());

app.use(routes);

export default app;