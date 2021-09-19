import dayjs from 'dayjs'
import { GenerateTokenProvider } from '../../../providers/GenerateTokenProvider'

import { IRefreshTokenRepository } from '../repositories/IRefreshTokenRepository'
import { GenerateRefreshTokenService } from './GenerateRefreshTokenService'

class RefreshTokenService {
  constructor(private repository: IRefreshTokenRepository) { }

  async execute(refreshTokenId: string) {
    const refreshTokenDetails = await this.repository.getById(refreshTokenId)

    if (!refreshTokenDetails) {
      throw new Error('Refresh token invalid')
    }
    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshTokenDetails.expiresIn)
    )

    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(
      refreshTokenDetails.employeeId
    )

    if (refreshTokenExpired) {
      const generateRefreshTokenProvider = new GenerateRefreshTokenService(
        this.repository
      )

      const newRefreshToken = await generateRefreshTokenProvider.execute(
        refreshTokenDetails.employeeId
      )

      return { token, refreshToken: newRefreshToken }
    }
  }
}
export { RefreshTokenService }
