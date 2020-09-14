import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/appointments.repository';
import CreateAppointmentService from '../services/create-appointment.service';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();
const createAppointmentService = new CreateAppointmentService(
  appointmentsRepository,
);

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.findAll();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const appointment = createAppointmentService.execute({
      provider,
      date: parseISO(date),
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: { message: err.message } });
  }
});

export default appointmentsRouter;
