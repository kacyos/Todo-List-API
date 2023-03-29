import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticatedUserController {
  // eslint-disable-next-line no-useless-constructor
  constructor (private readonly authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle (request: Request, response: Response): Promise<Response> {
    const { name, password } = request.body;

    const authenticatedUser = await this.authenticateUserUseCase.execute({ name, password });

    return response.status(200).json(authenticatedUser);
  }
}
