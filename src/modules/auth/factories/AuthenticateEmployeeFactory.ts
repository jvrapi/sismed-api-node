import { TypeormEmployeesRepository } from '../../employees/repositories/typeorm/TypeormEmployeesRepository'
import { AuthenticateEmployeeController } from '../controllers/AuthenticateEmployeeController'
import { TypeormRefreshTokensRepository } from '../repositories/typeorm/TypeormRefreshTokensRepository'
import { AuthenticateEmployeeService } from '../services/AuthenticateEmployeeService'

const authenticateEmployee = () => {
  const employeeRepository = new TypeormEmployeesRepository()
  const refreshTokenRepository = new TypeormRefreshTokensRepository()
  const service = new AuthenticateEmployeeService(
    employeeRepository,
    refreshTokenRepository
  )
  const controller = new AuthenticateEmployeeController(service)
  return controller
}

export { authenticateEmployee }
