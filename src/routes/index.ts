import { Router } from 'express'
import { EmployeesRoutes } from './employees.routes'
import { AuthRoutes } from './auth.routes'

const routes = Router()

routes.use('/employees', EmployeesRoutes)
routes.use('/auth', AuthRoutes)
export { routes }
