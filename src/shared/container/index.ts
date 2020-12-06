import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';

import AppointmentsRepository from '@modules/appointments/repositories/appointments.repository';
import AppointmentsRepositoryImplementation from '@modules/appointments/infra/typeorm/repositories/appointments.repository.implementation';

import UsersRepository from '@modules/users/repositories/users.repository';
import UsersRepositoryImplementation from '@modules/users/infra/typeorm/repositories/users.repository.implementation';

container.registerSingleton<AppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepositoryImplementation,
);

container.registerSingleton<UsersRepository>(
  'UsersRepository',
  UsersRepositoryImplementation,
);
