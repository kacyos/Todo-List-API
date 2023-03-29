import { UserRepository } from '../../repositories/implementations/UserRepository';
import { AuthenticatedUserController } from './AuthenticatedUserController';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

const userRepository = UserRepository.getInstance();

const authenticateUSerUseCase = new AuthenticateUserUseCase(userRepository);
const authenticateUserController = new AuthenticatedUserController(authenticateUSerUseCase);

export { authenticateUserController };
