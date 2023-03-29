import bcrypt from 'bcrypt';

export function hash (data: string, salt: number) {
  return bcrypt.hash(data, salt);
}

export function compare (data: string, hash: string) {
  return bcrypt.compare(data, hash);
}

export function hashPassword (password: string) {
  return bcrypt.hash(password, 12);
}
