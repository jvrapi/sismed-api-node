import { UpdateEmployeeController } from '../controllers/UpdateEmployeeController'
import { TypeormEmployeesRepository } from '../repositories/typeorm/TypeormEmployeesRepository'
import { UpdateEmployeeService } from '../services/UpdateEmployeeService'

const updateEmployeeFactory = () => {
  const updateEmployeeRepository = new TypeormEmployeesRepository()
  const updateEmployeeService = new UpdateEmployeeService(
    updateEmployeeRepository
  )
  const updateEmployeeController = new UpdateEmployeeController(
    updateEmployeeService
  )
  return updateEmployeeController
}

export default updateEmployeeFactory
