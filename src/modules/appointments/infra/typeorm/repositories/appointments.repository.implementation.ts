import { getRepository, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/appointment.entity';
import AppointmentsRepository from '@modules/appointments/repositories/appointments.repository';
import CreateAppointmentDTO from '@modules/appointments/dtos/create-appointment.dto';

class AppointmentsRepositoryImplementation implements AppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentOnDate = await this.ormRepository.findOne({
      where: { date },
    });

    return appointmentOnDate;
  }

  public async create({
    providerId,
    date,
  }: CreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ providerId, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepositoryImplementation;
