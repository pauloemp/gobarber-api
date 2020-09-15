import { Router } from 'express';

import AuthenticateUserService from '../../services/authenticate-user.service';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const { token, user } = await authenticateUserService.execute({
      email,
      password,
    });

    const { password: _, ...userWithouPassword } = user;

    return response.json({ token, userWithouPassword });
  } catch (err) {
    return response.status(400).json({ error: { message: err.message } });
  }
});

export default sessionsRouter;
