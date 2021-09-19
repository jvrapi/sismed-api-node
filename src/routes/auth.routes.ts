import { Router } from 'express'
import { authenticateEmployee } from '../modules/auth/factories/AuthenticateEmployeeFactory'

const AuthRoutes = Router()

AuthRoutes.post('/', (request, response) =>
  authenticateEmployee().handle(request, response)
)

export { AuthRoutes }
