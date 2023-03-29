import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/generateToken';

export function authMiddleware (request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ message: 'Token is missing.' });
  }

  const [bearer, token] = authorization.split(' ');
  const tokenIsValid = token === verifyToken(token);

  if (bearer !== 'Bearer' || !tokenIsValid) {
    return response.status(401).json({ message: 'Token is invalid.' });
  }

  return next();
}
