import { IEmployeeRepository } from '../../../modules/employees/repositories/IEmployeeRepository'
import { InMemoryEmployeesRepository } from '../../../modules/employees/repositories/in-memory/InMemoryEmployeesRepository'
import { InMemoryRefreshTokenRepository } from '../../../modules/token/repositories/in-memory/InMemoryRefreshTokenRepository'
import { CreateEmployeeService } from '../../../modules/employees/services/CreateEmployeeService'
import { AuthenticateEmployeeService } from '../../../modules/employees/services/AuthenticateEmployeeService'
import { IRefreshTokenRepository } from '../../../modules/token/repositories/IRefreshTokenRepository'

describe('Authenticate employee', () => {
  let employeeRepository: IEmployeeRepository
  let refreshTokenRepository: IRefreshTokenRepository
  let authenticateEmployeeService: AuthenticateEmployeeService
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
    employeeRepository = new InMemoryEmployeesRepository()

    refreshTokenRepository = new InMemoryRefreshTokenRepository()

    authenticateEmployeeService = new AuthenticateEmployeeService(
      employeeRepository,
      refreshTokenRepository
    )

    createEmployeeService = new CreateEmployeeService(employeeRepository)
  })

  it('should be able to authenticate an employee', async () => {
    const employee = await createEmployeeService.execute(employeeData)

    const authenticated = await authenticateEmployeeService.execute(
      employee.cpf,
      '4bz8JFBaGF'
    )
    expect(authenticated).toHaveProperty('token')
    expect(authenticated).toHaveProperty('refreshToken')
    expect(authenticated).toHaveProperty('name')
    expect(typeof authenticated).toBe('object')
  })
})
