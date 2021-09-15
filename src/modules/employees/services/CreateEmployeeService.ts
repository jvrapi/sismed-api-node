import { Employee } from 'entities/Employee'
import { DeepPartial } from 'typeorm'
import { IEmployeeRepository } from '../repositories/IEmployeeRepository'

class CreateEmployeeService {
  constructor(private employeesRepository: IEmployeeRepository) { }

  async execute(employee: DeepPartial<Employee>) {
    if (!employee.profileId) {
      if (!employee.crm) {
        employee.profileId = 3
      } else {
        employee.profileId = 2
      }
    }
    try {
      const employees = await this.employeesRepository.save(employee)
      return employees
    } catch (error) {
      throw new Error('Error trying create new employee')
    }
  }
}

export { CreateEmployeeService }
