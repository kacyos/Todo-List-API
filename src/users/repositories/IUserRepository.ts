import { User } from '@prisma/client';

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface ISaveTokenResponse {
  name: string;
  token: string | null;
}

export interface ICreateUserRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<void>;
  findUserByEmail(email: string): Promise<User | null>;
  findByName(name: string): Promise<User | null>;
  saveToken(userId: string, token: string): Promise<ISaveTokenResponse>;
}
