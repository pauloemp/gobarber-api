import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/appointments.repository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.findAll();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const appointmentInSameDate = appointmentsRepository.findByDate(parsedDate);

  if (appointmentInSameDate) {
    return response
      .status(400)
      .json({ error: { message: 'This date is unavailable' } });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
