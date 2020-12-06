import { v4 as uuid } from 'uuid';

import User from '@modules/users/infra/typeorm/entities/user.entity';
import UsersRepository from '@modules/users/repositories/users.repository';
import CreateUserDTO from '@modules/users/dtos/create-user.dto';

class UsersRepositoryImplementation implements UsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(usr => usr.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(usr => usr.email === email);

    return user;
  }

  public async create(userData: CreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async update(user: User): Promise<User> {
    const userIndex = this.users.findIndex(usr => usr.id === user.id);

    this.users[userIndex] = user;

    return user;
  }
}

export default UsersRepositoryImplementation;
