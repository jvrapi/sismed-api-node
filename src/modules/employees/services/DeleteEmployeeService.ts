import { IEmployeeRepository } from '../repositories/IEmployeeRepository'

class DeleteEmployeeService {
  constructor(private repository: IEmployeeRepository) { }
  async execute(id: number) {
    if (!id) {
      throw new Error('Missing information')
    }

    try {
      await this.repository.delete(id)
      return 'Employee deleted successfully'
    } catch {
      throw new Error('Error trying  delete employee')
    }
  }
}
export { DeleteEmployeeService }
