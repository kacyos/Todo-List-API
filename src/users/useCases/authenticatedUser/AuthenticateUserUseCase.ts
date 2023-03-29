import bcrypt from 'bcrypt';
import { NotAuthorizedError } from '../../../helpers/ApiErros';
import { generateToken } from '../../../helpers/generateToken';
import { UserRepository } from '../../repositories/implementations/UserRepository';

interface IAuthenticatedUser {
  name: string;
  password: string;
 }

export class AuthenticateUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor (private userRepository: UserRepository) {}

  async execute ({ name, password }: IAuthenticatedUser) {
    const user = await this.userRepository.findByName(name);

    if (!user?.id) {
      throw new NotAuthorizedError('User or password incorrect.');
    }

    const passwordMatch = await bcrypt.compare(password, user?.password);

    if (!passwordMatch) {
      throw new NotAuthorizedError('User or password incorrect.');
    }
    const token = generateToken(user.name);

    const authenticatedUser = await this.userRepository.saveToken(user.id, token);

    return authenticatedUser;
  }
}
