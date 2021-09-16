import {
  IRefreshToken,
  IRefreshTokenRepository
} from '../IRefreshTokenRepository'

class InMemoryRefreshTokenRepository implements IRefreshTokenRepository {
  refreshTokens: IRefreshToken[] = []

  update(refreshToken: IRefreshToken): Promise<IRefreshToken> {
    this.refreshTokens = this.refreshTokens.filter(
      token => token.employeeId !== refreshToken.employeeId
    )
    this.refreshTokens.push(refreshToken)
    return new Promise<IRefreshToken>((resolve, reject) => {
      resolve(refreshToken)
    })
  }
}
export { InMemoryRefreshTokenRepository }
