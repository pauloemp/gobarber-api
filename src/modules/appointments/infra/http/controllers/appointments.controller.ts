import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/create-appointment.service';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { providerId, date } = request.body;

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    const appointment = await createAppointmentService.execute({
      providerId,
      date: parseISO(date),
    });

    return response.json(appointment);
  }
}
