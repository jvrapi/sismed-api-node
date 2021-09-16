import { IEmployeeRepository } from '../repositories/IEmployeeRepository'

class DeleteEmployeeService {
  constructor(private repository: IEmployeeRepository) { }
  async execute(id: number) {
    if (!id) {
      throw new Error('Missing information')
    }
    try {
      const message = await this.repository.delete(id)
      return message
    } catch {
      throw new Error('Error trying  delete employee')
    }
  }
}
export { DeleteEmployeeService }
