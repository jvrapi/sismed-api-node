import { Employee } from '../../../../entities/Employee'
import { getRepository, Repository } from 'typeorm'
import { IEmployeeRepository, IUniqueField } from '../IEmployeeRepository'

class TypeormEmployeesRepository implements IEmployeeRepository {
  private repository: Repository<Employee>
  constructor() {
    this.repository = getRepository(Employee)
  }

  async listAll(): Promise<Employee[]> {
    const employees = this.repository.find({
      order: {
        name: 'ASC'
      },
      take: 15
    })
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

  async informationAlreadyExists({
    id,
    cpf,
    crm,
    rg
  }: IUniqueField): Promise<Boolean> {
    const informationAlreadyExists = await this.repository
      .createQueryBuilder()
      .where('(id <> :id) AND (rg = :rg OR cpf = :cpf OR crm = :crm)', {
        id,
        rg,
        cpf,
        crm
      })
      .getOne()
    return new Promise<Boolean>((resolve, reject) => {
      if (informationAlreadyExists) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }

  update(employee: Employee): Promise<Employee> {
    return this.repository.save(employee)
  }

  save(employee: Employee): Promise<Employee> {
    const newEmployee = this.repository.create(employee)
    return this.repository.save(newEmployee)
  }

  async delete(employeeId: number): Promise<String> {
    await this.repository.delete(employeeId)
    return new Promise<String>((resolve, reject) => {
      resolve('Employee deleted successfully')
    })
  }
}

export { TypeormEmployeesRepository }
