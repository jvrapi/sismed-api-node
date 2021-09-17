import { IRefreshTokenRepository } from '../../modules/token/repositories/IRefreshTokenRepository'
import { IEmployeeRepository } from '../../modules/employees/repositories/IEmployeeRepository'
import { InMemoryRefreshTokenRepository } from '../../modules/token/repositories/in-memory/InMemoryRefreshTokenRepository'
import { InMemoryEmployeesRepository } from '../../modules/employees/repositories/in-memory/InMemoryEmployeesRepository'
import { RefreshTokenService } from '../../modules/token/services/RefreshTokenService'
import { CreateEmployeeService } from '../../modules/employees/services/CreateEmployeeService'
import { AuthenticateEmployeeService } from '../../modules/employees/services/AuthenticateEmployeeService'
import { RefreshToken } from '../../entities/RefreshToken'

interface EmployeeAuthenticated {
  token: string
  name: string
  refreshToken: RefreshToken
}

describe('Refresh token', () => {
  let refreshTokenRepository: IRefreshTokenRepository
  let employeeRepository: IEmployeeRepository
  let refreshTokenService: RefreshTokenService
  let createEmployeeService: CreateEmployeeService
  let authenticateEmployeeService: AuthenticateEmployeeService
  let authenticatedEmployee: EmployeeAuthenticated

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

  beforeAll(async () => {
    refreshTokenRepository = new InMemoryRefreshTokenRepository()
    employeeRepository = new InMemoryEmployeesRepository()
    createEmployeeService = new CreateEmployeeService(employeeRepository)
    authenticateEmployeeService = new AuthenticateEmployeeService(
      employeeRepository,
      refreshTokenRepository
    )
    refreshTokenService = new RefreshTokenService(refreshTokenRepository)

    await createEmployeeService.execute(employeeData)

    authenticatedEmployee = await authenticateEmployeeService.execute(
      employeeData.cpf,
      '4bz8JFBaGF'
    )
  })
  it('should be able to generate a new token using a refresh token', async () => {
    await new Promise(resolve => setTimeout(resolve, 3000))
    const { refreshToken, token } = await refreshTokenService.execute(
      authenticatedEmployee.refreshToken.id
    )

    expect(refreshToken.id).not.toEqual(authenticatedEmployee.refreshToken.id)
    expect(token).not.toEqual(authenticatedEmployee.token)
  })
})
jest.setTimeout(30000)
