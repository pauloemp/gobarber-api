import { v4 as uuid } from 'uuid';
import { isEqual } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/appointment.entity';
import AppointmentsRepository from '@modules/appointments/repositories/appointments.repository';
import CreateAppointmentDTO from '@modules/appointments/dtos/create-appointment.dto';

class FakeAppointmentsRepository implements AppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentOnDate = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return appointmentOnDate;
  }

  public async create({
    providerId,
    date,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: uuid(),
      date,
      providerId,
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
