import { RefreshToken } from '../../../../entities/RefreshToken'
import { IRefreshTokenRepository } from '../IRefreshTokenRepository'

class InMemoryRefreshTokenRepository implements IRefreshTokenRepository {
  refreshTokens: RefreshToken[] = []

  update(refreshToken: RefreshToken): Promise<RefreshToken> {
    this.refreshTokens = this.refreshTokens.filter(
      token => token.employeeId !== refreshToken.employeeId
    )
    this.refreshTokens.push(refreshToken)
    return new Promise<RefreshToken>((resolve, reject) => {
      resolve(refreshToken)
    })
  }

  getById(refreshTokenId: string): Promise<RefreshToken> {
    const refreshToken = this.refreshTokens.find(
      token => token.id === refreshTokenId
    )
    return new Promise<RefreshToken>((resolve, reject) => {
      resolve(refreshToken)
    })
  }
}
export { InMemoryRefreshTokenRepository }
