import { Request, Response } from 'express'
import { DeleteEmployeeService } from '../services/DeleteEmployeeService'
class DeleteEmployeeController {
  constructor(private service: DeleteEmployeeService) { }
  async handle(request: Request, response: Response) {
    const { id } = request.params
    const res = await this.service.execute(+id)
    return response.json(res)
  }
}
export { DeleteEmployeeController }
