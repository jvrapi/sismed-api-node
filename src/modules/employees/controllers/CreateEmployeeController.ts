import { Request, Response } from 'express'
import { CreateEmployeeService } from '../services/CreateEmployeeService'
import { EmployeeView } from '../views/EmployeeView'

class CreateEmployeeController {
  constructor(private createEmployee: CreateEmployeeService) { }
  async handle(request: Request, response: Response) {
    const employee = request.body
    const employeeView = new EmployeeView()
    const employees = await this.createEmployee.execute(employee)
    return response
      .status(201)
      .json(employeeView.listEmployeeDetails(employees))
  }
}

export { CreateEmployeeController }
