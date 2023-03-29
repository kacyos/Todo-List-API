
import { User } from '@prisma/client';
import { client } from '../../../database';
import { hashPassword } from '../../../helpers/encript';
import { ICreateUserDTO, ICreateUserRepository, ISaveTokenResponse } from '../IUserRepository';

export class UserRepository implements ICreateUserRepository {
  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: UserRepository;

  public static getInstance (): UserRepository {
    if (!UserRepository.INSTANCE) {
      UserRepository.INSTANCE = new UserRepository();
    }

    return UserRepository.INSTANCE;
  }

  async create ({ name, email, password }: ICreateUserDTO): Promise<void> {
    const encryptedPassword = await hashPassword(password);

    await client.user.create({
      data: {
        name,
        email,
        password: encryptedPassword
      }
    });
  }

  async findUserByEmail (email: string): Promise<User | null> {
    const user = await client.user.findUnique({
      where: {
        email
      }
    });

    return user;
  }

  async findByName (name: string): Promise<User | null> {
    const user = await client.user.findFirst({
      where: {
        name
      }
    });

    return user;
  }

  async saveToken (userId: string, token: string): Promise<ISaveTokenResponse> {
    const userAuth = await client.user.update({
      where: { id: userId },
      data: { token },
      select: {
        name: true,
        token: true
      }
    });

    return userAuth;
  }
}
