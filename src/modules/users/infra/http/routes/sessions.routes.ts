import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/authenticate-user.service';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService();

  const { token, user } = await authenticateUserService.execute({
    email,
    password,
  });

  const { password: _, ...userWithoutPassword } = user;

  return response.json({ token, user: userWithoutPassword });
});

export default sessionsRouter;
