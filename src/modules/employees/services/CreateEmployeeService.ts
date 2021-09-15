import { DeepPartial } from 'typeorm'
import { Employee } from '../../../entities/Employee'
import { IEmployeeRepository } from '../repositories/IEmployeeRepository'
import { hash } from 'bcryptjs'

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
    employee.password = await hash(employee.password, 8)

    const { cpf, rg, crm } = employee

    const employeeAlreadyExists =
      await this.employeesRepository.employeeAlreadyExists({ cpf, rg, crm })

    if (employeeAlreadyExists) {
      throw new Error('Employee already exists!')
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
