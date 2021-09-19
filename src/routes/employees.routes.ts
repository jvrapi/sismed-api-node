import { Router } from 'express'
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated'
import createEmployeeFactory from '../modules/employees/Factories/CreateEmployeeFactory'
import deleteEmployeeFactory from '../modules/employees/Factories/DeleteEmployeeFactory'
import listAllEmployeesFactory from '../modules/employees/Factories/ListAllEmployeesFactory'
import updateEmployeeFactory from '../modules/employees/Factories/UpdateEmployeeFactory'
const EmployeesRoutes = Router()

EmployeesRoutes.use(EnsureAuthenticated)

EmployeesRoutes.get('/', (request, response) =>
  listAllEmployeesFactory().handle(request, response)
)

EmployeesRoutes.post('/', (request, response) =>
  createEmployeeFactory().handle(request, response)
)
EmployeesRoutes.put('/', (request, response) =>
  updateEmployeeFactory().handle(request, response)
)

EmployeesRoutes.delete('/:id', (request, response) =>
  deleteEmployeeFactory().handle(request, response)
)

export { EmployeesRoutes }
