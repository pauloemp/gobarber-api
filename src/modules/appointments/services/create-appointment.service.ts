import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/app.error';

import Appointment from '@modules/appointments/infra/typeorm/entities/appointment.entity';
import AppointmentsRepository from '@modules/appointments/repositories/appointments.repository';

interface IRequest {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ providerId, date }: IRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const appointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (appointmentInSameDate) {
      throw new AppError('This date is unavailable');
    }

    const appointment = appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
