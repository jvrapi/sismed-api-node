import { IEmployeeRepository } from '../repositories/IEmployeeRepository'
import { compare } from 'bcryptjs'
import { GenerateTokenProvider } from '../../../providers/GenerateTokenProvider'
import { IRefreshTokenRepository } from '../../token/repositories/IRefreshTokenRepository'
import { GenerateRefreshTokenService } from '../../token/services/GenerateRefreshTokenService'

class AuthenticateEmployeeService {
  employeeRepository: IEmployeeRepository
  refreshTokenRepository: IRefreshTokenRepository

  constructor(
    employeeRepository: IEmployeeRepository,
    refreshTokenRepository: IRefreshTokenRepository
  ) {
    this.employeeRepository = employeeRepository
    this.refreshTokenRepository = refreshTokenRepository
  }

  async execute(username: string, password: string) {
    // verify is missing informations
    if (!username || !password) {
      throw new Error('Missing information')
    }

    try {
      const employee = await this.employeeRepository.getByCpf(username)

      const passwordIsCorrect = await compare(password, employee.password)

      // Verify password is correct
      if (!passwordIsCorrect) {
        throw new Error('Username or password is invalid')
      }

      // Generate token to employee
      const generateTokenProvider = new GenerateTokenProvider()
      const token = await generateTokenProvider.execute(employee.id)

      // Generate refresh token
      const generateRefreshTokenService = new GenerateRefreshTokenService(
        this.refreshTokenRepository
      )
      const refreshToken = await generateRefreshTokenService.execute(
        employee.id
      )
      return { name: employee.name, token, refreshToken }
    } catch {
      throw new Error('Error trying authenticate employee')
    }
  }
}
export { AuthenticateEmployeeService }
