import { Router } from 'express';
import { authenticateUserController } from '../users/useCases/authenticatedUser';
import { createUserController } from '../users/useCases/createUser';

const userRoutes = Router();

userRoutes.post('/create', (request, response) => createUserController.handle(request, response));
userRoutes.post('/auth', (request, response) => authenticateUserController.handle(request, response));

export { userRoutes };
