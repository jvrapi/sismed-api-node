import { CreateEmployeeController } from '../controllers/CreateEmployeeController'
import { TypeormEmployeesRepository } from '../repositories/typeorm/TypeormEmployeesRepository'
import { CreateEmployeeService } from '../services/CreateEmployeeService'

const createEmployeeFactory = () => {
  const createEmployeeRepository = new TypeormEmployeesRepository()
  const createEmployeeService = new CreateEmployeeService(
    createEmployeeRepository
  )
  const createEmployeeController = new CreateEmployeeController(
    createEmployeeService
  )
  return createEmployeeController
}

export default createEmployeeFactory
