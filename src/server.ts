import express from 'express';

import routes from './routes';

const app = express();

app.use(routes);

app.listen(3333, () => console.log('💻 Server running o port 3333')); // eslint-disable-line
