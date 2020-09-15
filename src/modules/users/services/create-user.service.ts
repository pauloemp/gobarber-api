import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../../../shared/errors/app.error';

import User from '../infra/typeorm/entities/user.entity';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const emailInUse = await usersRepository.findOne({
      where: { email },
    });

    if (emailInUse) {
      throw new AppError('Email address already in use');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
