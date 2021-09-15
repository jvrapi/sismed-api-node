import { ListEmployeesController } from '../controllers/ListEmployeesController'
import { TypeormEmployeesRepository } from '../repositories/typeorm/TypeormEmployeesRepository'
import { ListEmployeesService } from '../services/ListEmployeesService'

const listAllEmployeesFactory = () => {
  const listEmployeesRepository = new TypeormEmployeesRepository()
  const listEmployeesService = new ListEmployeesService(listEmployeesRepository)
  const listEmployeesController = new ListEmployeesController(
    listEmployeesService
  )
  return listEmployeesController
}

export default listAllEmployeesFactory
