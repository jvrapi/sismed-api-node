import { DeepPartial } from 'typeorm'
import { RefreshToken } from '../../../entities/RefreshToken'

interface IRefreshTokenRepository {
  update(refreshToken: DeepPartial<RefreshToken>): Promise<RefreshToken>
  getById(refreshTokenId: string): Promise<RefreshToken>
}

export { IRefreshTokenRepository }
