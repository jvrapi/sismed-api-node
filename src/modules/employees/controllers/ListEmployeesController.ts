import { Request, Response } from 'express'
import { ListEmployeesService } from '../services/ListEmployeesService'
import { EmployeeView } from '../views/EmployeeView'

class ListEmployeesController {
  constructor(private listEmployees: ListEmployeesService) { }
  async handle(request: Request, response: Response) {
    const employees = await this.listEmployees.execute()
    const employeeView = new EmployeeView()
    return response.json(employeeView.listEmployeesDetails(employees))
  }
}

export { ListEmployeesController }
