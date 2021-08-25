import { Request, Response } from 'express'
import { ListEmployeesService } from '../services/ListEmployeesService'

class ListEmployeesController {
  constructor(private listEmployees: ListEmployeesService) { }
  async handle(request: Request, response: Response) {
    const employees = await this.listEmployees.execute()
    return response.json(employees)
  }
}

export { ListEmployeesController }
