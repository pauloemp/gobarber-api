import { Router } from 'express';
import appointmentsRouter from '../../modules/appointments/routes/appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

routes.get('/', (request, response) =>
  response.status(200).json({ message: 'Hello Friend' }),
);

export default routes;
