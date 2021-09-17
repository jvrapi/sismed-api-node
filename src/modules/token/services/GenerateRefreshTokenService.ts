import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'
import { IRefreshTokenRepository } from '../repositories/IRefreshTokenRepository'

class GenerateRefreshTokenService {
  constructor(private repository: IRefreshTokenRepository) { }
  async execute(employeeId: number) {
    const seconds = process.env.TEST ? '3' : '1200'
    const expiresIn = dayjs()
      .add(+seconds, 'second')
      .unix()
    const refreshTokenData = {
      id: uuid(),
      expiresIn,
      employeeId
    }
    try {
      const refreshToken = await this.repository.update(refreshTokenData)
      return refreshToken
    } catch {
      throw new Error('Error trying create a refresh token')
    }
  }
}
export { GenerateRefreshTokenService }
