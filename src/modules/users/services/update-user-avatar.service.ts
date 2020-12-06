import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/app.error';

import User from '@modules/users/infra/typeorm/entities/user.entity';
import UsersRepository from '@modules/users/repositories/users.repository';

import StorageProvider from '@shared/container/providers/storage/models/storage.provider';

interface Request {
  userId: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,

    @inject('StorageProvider')
    private storageProvider: StorageProvider,
  ) {}

  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.update(user);

    return user;
  }
}

export default UpdateUserAvatarService;
