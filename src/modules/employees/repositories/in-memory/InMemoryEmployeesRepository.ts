import Employee from '@entities/Employee'
import { IEmployeeRepository } from '../IEmployeeRepository'

class InMemoryEmployeesRepository implements IEmployeeRepository {
  listAll(): Promise<Employee[]> {
    throw new Error('Method not implemented.')
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
export { InMemoryEmployeesRepository }
