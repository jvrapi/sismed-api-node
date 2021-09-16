import { DeleteEmployeeController } from '../controllers/DeleteEmployeeController'
import { TypeormEmployeesRepository } from '../repositories/typeorm/TypeormEmployeesRepository'
import { DeleteEmployeeService } from '../services/DeleteEmployeeService'

const deleteEmployeeFactory = () => {
  const repository = new TypeormEmployeesRepository()
  const service = new DeleteEmployeeService(repository)
  const controller = new DeleteEmployeeController(service)
  return controller
}

export default deleteEmployeeFactory
