import { Request, Response } from 'express'
import { UpdateEmployeeService } from '../services/UpdateEmployeeService'
import { EmployeeView } from '../views/EmployeeView'

class UpdateEmployeeController {
  constructor(private service: UpdateEmployeeService) { }

  async handle(request: Request, response: Response) {
    const employee = request.body
    const updatedEmployee = await this.service.execute(employee)
    const employeeView = new EmployeeView()
    return response.json(employeeView.listEmployeeDetails(updatedEmployee))
  }
}

export { UpdateEmployeeController }
