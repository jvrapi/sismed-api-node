import { Router } from 'express'
import EmployeesRoutes from './employees.routes'

const routes = Router()

routes.use('/employees', EmployeesRoutes)

export { routes }
