import { Router } from 'express'
import { listAllEmployeesFactory } from '../modules/employees'
const routes = Router()

routes.get('/', (request, response) =>
  listAllEmployeesFactory().handle(request, response)
)

export default routes
