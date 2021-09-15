import { Employee } from '../../../../entities/Employee'
import { IEmployeeRepository, IUniqueField } from '../IEmployeeRepository'

class InMemoryEmployeesRepository implements IEmployeeRepository {
  private employees: Employee[] = []

  listAll(): Promise<Employee[]> {
    return new Promise<Employee[]>((resolve, reject) => {
      resolve(this.employees)
    })
  }

  getById(id: number): Promise<Employee> {
    throw new Error('Method not implemented.')
  }

  employeeAlreadyExists({ cpf, crm, rg }: IUniqueField): Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {
      resolve(
        this.employees.some(
          employee =>
            employee.cpf === cpf || employee.crm === crm || employee.rg === rg
        )
      )
    })
  }

  update(employee: Employee): Promise<Employee> {
    throw new Error('Method not implemented.')
  }

  save(employee: Employee): Promise<Employee> {
    Object.assign(employee, {
      id: this.employees.length + 1,
      address: {
        ...employee.address,
        id: this.employees.length + 1
      }
    })

    this.employees.push(employee)

    return new Promise<Employee>((resolve, reject) => {
      resolve(employee)
    })
  }

  delete(employeeId: number): Promise<String> {
    throw new Error('Method not implemented.')
  }
}
export { InMemoryEmployeesRepository }
