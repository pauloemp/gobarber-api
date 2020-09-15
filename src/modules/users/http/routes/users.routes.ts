import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';

import ensureAuthenticated from '../../../../shared/http/middlewares/ensure-athenticated.middleware';

import CreateUserService from '../../services/create-user.service';
import UpdateUserAvatarService from '../../services/update-user-avatar.service';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const { password: _, ...user } = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: { message: err.message } });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatarService = new UpdateUserAvatarService();

      const user = await updateUserAvatarService.execute({
        userId: request.user.id,
        avatarFilename: request.file.filename,
      });

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: { message: err.message } });
    }
  },
);

export default usersRouter;
