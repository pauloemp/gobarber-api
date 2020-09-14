import { startOfHour } from 'date-fns';

import Appointment from '../entities/appointment.entity';
import AppointmentsRepository from '../repositories/appointments.repository';

interface IRequest {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  public execute({ provider, date }: IRequest): Appointment {
    const appointmentDate = startOfHour(date);

    const appointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (appointmentInSameDate) {
      throw new Error('This date is unavailable');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
