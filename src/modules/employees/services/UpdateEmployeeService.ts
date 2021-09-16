import { DeepPartial } from 'typeorm'
import { Employee } from '../../../entities/Employee'
import { IEmployeeRepository } from '../repositories/IEmployeeRepository'

class UpdateEmployeeService {
  constructor(private repository: IEmployeeRepository) { }

  async execute(employeeData: DeepPartial<Employee>) {
    if (!employeeData.id) {
      throw new Error('Missing information')
    }
    if (!employeeData.crm) {
      employeeData.profileId = 3
    } else {
      employeeData.profileId = 2
    }

    const { id, cpf, rg, crm } = employeeData
    const employeeAlreadyExists =
      await this.repository.informationAlreadyExists({
        id,
        cpf,
        rg,
        crm
      })

    if (employeeAlreadyExists) {
      throw new Error('Cannot update employee')
    }

    try {
      const employee = await this.repository.update(employeeData)
      return employee
    } catch (error) {
      throw new Error('Error trying update new employee')
    }
  }
}
export { UpdateEmployeeService }
