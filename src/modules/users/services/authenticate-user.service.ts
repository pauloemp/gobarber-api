import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import HashProvider from '@modules/users/providers/hash/models/hash.provider';

import AppError from '@shared/errors/app.error';

import authConfig from '@config/auth';

import User from '@modules/users/infra/typeorm/entities/user.entity';
import UsersRepository from '@modules/users/repositories/users.repository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Wrong email or password', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Wrong email or password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default CreateUserService;
