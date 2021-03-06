import { Router } from 'express';

import AppointmentsController from '@modules/appointments/infra/http/controllers/appointments.controller';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-athenticated.middleware';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
