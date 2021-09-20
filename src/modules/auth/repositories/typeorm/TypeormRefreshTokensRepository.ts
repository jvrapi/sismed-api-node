import { getRepository, Repository } from 'typeorm'
import { RefreshToken } from '../../../../entities/RefreshToken'
import { IRefreshTokenRepository } from '../IRefreshTokenRepository'

class TypeormRefreshTokensRepository implements IRefreshTokenRepository {
  private repository: Repository<RefreshToken>

  constructor() {
    this.repository = getRepository(RefreshToken)
  }

  async update(refreshToken: RefreshToken): Promise<RefreshToken> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .where('employeeId = :employeeId', {
        employeeId: refreshToken.employeeId
      })
      .execute()

    const generateRefreshToken = this.repository.create(refreshToken)

    return this.repository.save(generateRefreshToken)
  }

  getById(refreshTokenId: string): Promise<RefreshToken> {
    return this.repository.findOneOrFail({ id: refreshTokenId })
  }
}
export { TypeormRefreshTokensRepository }
