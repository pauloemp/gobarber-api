import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../../repositories/appointments.repository';
import CreateAppointmentService from '../../services/create-appointment.service';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { providerId, date } = request.body;

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
      providerId,
      date: parseISO(date),
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: { message: err.message } });
  }
});

export default appointmentsRouter;
