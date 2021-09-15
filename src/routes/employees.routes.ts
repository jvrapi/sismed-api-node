import { Router } from 'express'
import { CreateEmployee, ListAllEmployees } from '../modules/employees/'
const routes = Router()

routes.get('/', (request, response) =>
  ListAllEmployees().handle(request, response)
)

routes.post('/', (request, response) =>
  CreateEmployee().handle(request, response)
)

export default routes
