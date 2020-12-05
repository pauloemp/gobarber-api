import 'reflect-metadata';

import AppError from '@shared/errors/app.error';

import CreateAppointmentService from './create-appointment.service';
import FakeAppointmentRepositpry from '../repositories/fakes/appointments.repository.fake';

describe('Create Appointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepositpry = new FakeAppointmentRepositpry();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepositpry,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('123123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepositpry = new FakeAppointmentRepositpry();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepositpry,
    );

    const appointmentData = new Date(2020, 11, 5, 11);

    await createAppointment.execute({
      date: appointmentData,
      providerId: '123123',
    });

    expect(
      createAppointment.execute({
        date: appointmentData,
        providerId: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
