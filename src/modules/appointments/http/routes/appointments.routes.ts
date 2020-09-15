import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../../repositories/appointments.repository';
import CreateAppointmentService from '../../services/create-appointment.service';

import ensureAuthenticated from '../../../../shared/http/middlewares/ensure-athenticated.middleware';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { providerId, date } = request.body;

  const createAppointmentService = new CreateAppointmentService();

  const appointment = await createAppointmentService.execute({
    providerId,
    date: parseISO(date),
  });

  return response.json(appointment);
});

export default appointmentsRouter;
