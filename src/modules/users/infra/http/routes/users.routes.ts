import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensure-athenticated.middleware';

import CreateUserService from '@modules/users/services/create-user.service';
import UpdateUserAvatarService from '@modules/users//services/update-user-avatar.service';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  const { password: _, ...user } = await createUserService.execute({
    name,
    email,
    password,
  });

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  },
);

export default usersRouter;
