import jwt from 'jsonwebtoken';

export function generateToken (name: string) {
  const token = jwt.sign({ name }, 'process.env.SECRET', {
    expiresIn: '1d'
  });

  return token;
}

export function verifyToken (token: string) {
  const decoded = jwt.verify(token, process.env.SECRET);

  return decoded;
}

