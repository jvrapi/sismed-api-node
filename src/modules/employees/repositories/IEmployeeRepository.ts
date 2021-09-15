import { DeepPartial } from 'typeorm'
import { Employee } from '../../../entities/Employee'

export interface IUniqueField {
  rg: string
  cpf: string
  crm: string
}

interface IEmployeeRepository {
  listAll(): Promise<Employee[]>
  getById(id: number): Promise<Employee>
  update(employee: Employee): Promise<Employee>
  save(employee: DeepPartial<Employee>): Promise<Employee>
  delete(employeeId: number): Promise<String>
  employeeAlreadyExists(uniqueField: IUniqueField): Promise<Boolean>
}

export { IEmployeeRepository }
