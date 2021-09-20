import { Router } from 'express'
import { authenticateEmployee } from '../modules/auth/factories/AuthenticateEmployeeFactory'
import { refreshTokenFactory } from '../modules/auth/factories/RefreshTokenFactory'

const AuthRoutes = Router()

AuthRoutes.post('/', (request, response) =>
  authenticateEmployee().handle(request, response)
)

AuthRoutes.post('/refresh-token', (request, response) =>
  refreshTokenFactory().handle(request, response)
)

export { AuthRoutes }
