import { Router } from 'express';

import CreateUserService from '../../services/create-user.service';

const usersRouter = Router();

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

export default usersRouter;
