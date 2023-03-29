import { BadRequestError } from '../../../helpers/ApiErros';
import { ICreateUserRepository } from '../../repositories/IUserRepository';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export class CreateUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor (private createUserRepository: ICreateUserRepository) {}

  async execute ({ name, email, password, passwordConfirmation }: ICreateUser) {
    const emailInUse = await this.createUserRepository.findUserByEmail(email);
    const nameInUse = await this.createUserRepository.findByName(name);

    if (emailInUse || nameInUse) {
      throw new BadRequestError('User already exists.', {
        email: emailInUse ? 'Email already in use' : 'OK',
        name: nameInUse ? 'Name already in use' : 'OK'
      });
    }

    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;

    const emailIsValid = emailRegex.test(email);
    const nameIsValid = name?.length >= 4;
    const passwordIsValid = password?.length >= 6;
    const passwordConfirmationIsValid = password === passwordConfirmation;

    const isValid = emailIsValid && nameIsValid && passwordIsValid && passwordConfirmationIsValid;

    if (!isValid) {
      throw new BadRequestError('All fields must be filled', {
        name: nameIsValid ? 'OK' : 'minimum 4 characters',
        email: emailIsValid ? 'OK' : 'must be a valid email',
        password: passwordIsValid ? 'OK' : 'minimum 6 characters',
        passwordConfirmation: passwordConfirmationIsValid ? 'OK' : 'must be equal to password'
      });
    }

    return await this.createUserRepository.create({ name, email, password });
  }
}
