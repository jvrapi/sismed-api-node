import { IEmployeeRepository } from '../../../modules/employees/repositories/IEmployeeRepository'
import { InMemoryEmployeesRepository } from '../../../modules/employees/repositories/in-memory/InMemoryEmployeesRepository'
import { CreateEmployeeService } from '../../../modules/employees/services/CreateEmployeeService'

describe('Create new employee service', () => {
  let createNewEmployeeRepository: IEmployeeRepository
  let createEmployeeService: CreateEmployeeService

  const employeeData = {
    name: 'Alexandre Renan Silveira',
    cpf: '07202007762',
    rg: '284301383',
    email: 'alexandrerenansilveira_@lexos.com.br',
    dateBirth: new Date('1999-07-06'),
    beginDate: new Date(),
    cellNumber: '21999215617',
    phone: '2136254129',
    emittingDate: new Date('2018-30-06'),
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

  beforeAll(async () => {
    createNewEmployeeRepository = new InMemoryEmployeesRepository()
    createEmployeeService = new CreateEmployeeService(
      createNewEmployeeRepository
    )
  })

  it('should be able to create a new employee', async () => {
    const employee = await createEmployeeService.execute(employeeData)
    expect(typeof employee).toBe('object')
    expect(employee).toHaveProperty('id')
    expect(employee.address).toHaveProperty('id')
  })

  it('should be not able to create a user with an existing cpf', async () => {
    await expect(createEmployeeService.execute(employeeData)).rejects.toEqual(
      new Error('Employee already exists!')
    )
  })

  it('should be not able to create a user with an existing rg', async () => {
    await expect(createEmployeeService.execute(employeeData)).rejects.toEqual(
      new Error('Employee already exists!')
    )
  })

  it('should be not able to create a user with an existing crm', async () => {
    await expect(createEmployeeService.execute(employeeData)).rejects.toEqual(
      new Error('Employee already exists!')
    )
  })
})
