import Employee from '@entities/Employee'
import { getRepository, Repository } from 'typeorm'
import { IEmployeeRepository } from '../IEmployeeRepository'

class TypeormEmployeesRepository implements IEmployeeRepository {
  private repository: Repository<Employee>
  constructor() {
    this.repository = getRepository(Employee)
  }

  async listAll(): Promise<Employee[]> {
    const employees = this.repository.find()
    return employees
  }

  getById(id: number): Promise<Employee> {
    throw new Error('Method not implemented.')
  }

  update(employee: Employee): Promise<Employee> {
    throw new Error('Method not implemented.')
  }

  save(employee: Employee): Promise<Employee> {
    throw new Error('Method not implemented.')
  }

  delete(employeeId: number): Promise<String> {
    throw new Error('Method not implemented.')
  }
}

export { TypeormEmployeesRepository }
