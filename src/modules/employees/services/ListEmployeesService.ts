import { IEmployeeRepository } from '../repositories/IEmployeeRepository'

class ListEmployeesService {
  constructor(private employeesRepository: IEmployeeRepository) { }

  async execute() {
    try {
      const employees = await this.employeesRepository.listAll()
      return employees
    } catch (error) {
      console.log(error)
      throw new Error('Error trying list employees')
    }
  }
}

export { ListEmployeesService }
