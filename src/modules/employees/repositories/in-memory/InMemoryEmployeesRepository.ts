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
            employee.cpf === cpf ||
            employee.rg === rg ||
            (employee.crm && employee.crm === crm)
        )
      )
    })
  }

  informationAlreadyExists({
    id,
    cpf,
    crm,
    rg
  }: IUniqueField): Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {
      resolve(
        this.employees
          .filter(employee => employee.id !== id)
          .some(
            employee =>
              employee.cpf === cpf ||
              employee.rg === rg ||
              (employee.crm && employee.crm === crm)
          )
      )
    })
  }

  update(employeeData: Employee): Promise<Employee> {
    let arrayPosition: number
    const updatedArray = this.employees.map((employee, i) => {
      if (employeeData.id === employee.id) {
        arrayPosition = i
        return employeeData
      } else {
        return employee
      }
    })

    this.employees = updatedArray

    return new Promise<Employee>((resolve, reject) => {
      resolve(this.employees[arrayPosition])
    })
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
