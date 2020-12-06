import { injectable, inject } from 'tsyringe';

import HashProvider from '@modules/users/providers/hash/models/hash.provider';

import AppError from '@shared/errors/app.error';

import User from '@modules/users/infra/typeorm/entities/user.entity';
import UsersRepository from '@modules/users/repositories/users.repository';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const emailInUse = await this.usersRepository.findByEmail(email);

    if (emailInUse) {
      throw new AppError('Email address already in use');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
