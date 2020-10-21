import { EntityRepository, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/appointment.entity';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const appointmentOnDate = await this.findOne({
      where: { date },
    });

    return appointmentOnDate || null;
  }
}

export default AppointmentsRepository;
