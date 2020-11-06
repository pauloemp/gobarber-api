import Appointment from '@modules/appointments/infra/typeorm/entities/appointment.entity';

import CreateAppointmentDTO from '@modules/appointments/dtos/create-appointment.dto';

export default interface AppointmentsRepository {
  create(data: CreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
