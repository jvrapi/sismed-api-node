import { CreateEmployeeController } from '../controllers/CreateEmployeeController'
import { TypeormEmployeesRepository } from '../repositories/typeorm/TypeormEmployeesRepository'
import { CreateEmployeeService } from '../services/CreateEmployeeService'

const createEmployeeFactory = () => {
  const createEmployeeRepository = new TypeormEmployeesRepository()
  const listEmployeesService = new CreateEmployeeService(
    createEmployeeRepository
  )
  const listEmployeesController = new CreateEmployeeController(
    listEmployeesService
  )
  return listEmployeesController
}

export default createEmployeeFactory
