import { Router } from 'express'
import {
  CreateEmployee,
  ListAllEmployees,
  UpdateEmployee,
  DeleteEmployee
} from '../modules/employees/'
const routes = Router()

routes.get('/', (request, response) =>
  ListAllEmployees().handle(request, response)
)

routes.post('/', (request, response) =>
  CreateEmployee().handle(request, response)
)
routes.put('/', (request, response) =>
  UpdateEmployee().handle(request, response)
)

routes.delete('/:id', (request, response) =>
  DeleteEmployee().handle(request, response)
)

export default routes
