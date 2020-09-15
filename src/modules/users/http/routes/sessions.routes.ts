import { Router } from 'express';

import AuthenticateUserService from '../../services/authenticate-user.service';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService();

  const { token, user } = await authenticateUserService.execute({
    email,
    password,
  });

  const { password: _, ...userWithouPassword } = user;

  return response.json({ token, userWithouPassword });
});

export default sessionsRouter;
