import { Request, Response } from 'express'
import { AuthenticateEmployeeService } from '../services/AuthenticateEmployeeService'
class AuthenticateEmployeeController {
  constructor(private service: AuthenticateEmployeeService) { }
  async handle(request: Request, response: Response) {
    const { username, password } = request.body
    const authenticatedEmployee = await this.service.execute(username, password)
    return response.json(authenticatedEmployee)
  }
}
export { AuthenticateEmployeeController }
