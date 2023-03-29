import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  // eslint-disable-next-line no-useless-constructor
  constructor (public createUserUseCase: CreateUserUseCase) {}

  async handle (request: Request, response: Response) {
    const { name, email, password, passwordConfirmation } = request.body;

    await this.createUserUseCase.execute({ name, email, password, passwordConfirmation });

    return response.status(201).send();
  }
}
