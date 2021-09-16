import { IEmployeeRepository } from '../../../modules/employees/repositories/IEmployeeRepository'
import { InMemoryEmployeesRepository } from '../../../modules/employees/repositories/in-memory/InMemoryEmployeesRepository'
import { CreateEmployeeService } from '../../../modules/employees/services/CreateEmployeeService'
import { DeleteEmployeeService } from '../../../modules/employees/services/DeleteEmployeeService'

describe('Delete employee ', () => {
  let deleteEmployeeRepository: IEmployeeRepository
  let deleteEmployeeService: DeleteEmployeeService
  let createEmployeeService: CreateEmployeeService

  const employeeData = {
    name: 'Alexandre Renan Silveira',
    cpf: '07202007762',
    rg: '284301383',
    email: 'alexandrerenansilveira_@lexos.com.br',
    dateBirth: '1999-07-06',
    beginDate: '2021-09-16',
    cellNumber: '21999215617',
    phone: '2136254129',
    emittingDate: '2018-06-30',
    emittingOrgan: 'DetranRJ',
    maritalStatus: 'S',
    nationality: 'B',
    naturalness: 'Rio de Janeiro',
    password: '4bz8JFBaGF',
    schooling: 'EMC',
    sex: 'M',
    address: {
      zipCode: '22780807',
      street: 'Rua Marilena',
      number: 109,
      neighborhood: 'Curicica',
      city: 'Rio de Janeiro',
      state: 'RJ'
    }
  }

  beforeAll(() => {
    deleteEmployeeRepository = new InMemoryEmployeesRepository()
    deleteEmployeeService = new DeleteEmployeeService(deleteEmployeeRepository)
    createEmployeeService = new CreateEmployeeService(deleteEmployeeRepository)
  })

  it('should be able to delete an employee by id', async () => {
    const employee = await createEmployeeService.execute(employeeData)
    const deleted = await deleteEmployeeService.execute(employee.id)

    expect(typeof deleted).toBe('string')
    expect(deleted).toEqual('Employee deleted successfully')
  })
})
