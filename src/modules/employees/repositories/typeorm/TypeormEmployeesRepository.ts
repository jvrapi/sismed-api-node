import { Employee } from '../../../../entities/Employee'
import { getRepository, Repository } from 'typeorm'
import { IEmployeeRepository, IUniqueField } from '../IEmployeeRepository'

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

  async employeeAlreadyExists(uniqueFields: IUniqueField): Promise<Boolean> {
    const userAlreadyExists = await this.repository
      .createQueryBuilder('employee')
      .where('cpf = :cpf OR crm = :crm OR rg = :rg', uniqueFields)
      .getMany()

    return new Promise<Boolean>((resolve, reject) => {
      if (userAlreadyExists.length === 0) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  }

  informationAlreadyExists({ cpf, crm, rg }: IUniqueField): Promise<Boolean> {
    throw new Error('Method not implemented.')
  }

  update(employee: Employee): Promise<Employee> {
    throw new Error('Method not implemented.')
  }

  save(employee: Employee): Promise<Employee> {
    const newEmployee = this.repository.create(employee)
    return this.repository.save(newEmployee)
  }

  delete(employeeId: number): Promise<String> {
    throw new Error('Method not implemented.')
  }
}

export { TypeormEmployeesRepository }
