import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
const EnsureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({ message: 'Token is missing' })
  }

  const [, token] = authToken.split(' ')

  const key = process.env.TOKEN_KEY

  try {
    verify(token, key)
    return next()
  } catch (error) {
    return response.status(401).json({ message: 'Token invalid' })
  }
}

export { EnsureAuthenticated }
