import User from '@modules/users/infra/typeorm/entities/user.entity';
import CreateUserDTO from '@modules/users/dtos/create-user.dto';

export default interface UsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
}
