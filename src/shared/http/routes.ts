import { Router } from 'express';
import usersRouter from '../../modules/users/http/routes/users.routes';
import sessionsRouter from '../../modules/users/http/routes/sessions.routes';
import appointmentsRouter from '../../modules/appointments/http/routes/appointments.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/appointments', appointmentsRouter);

routes.get('/', (request, response) =>
  response.status(200).json({ message: 'Hello Friend' }),
);

export default routes;
