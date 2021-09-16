import { getRepository, Repository } from 'typeorm'
import { RefreshToken } from '../../../../entities/RefreshToken'
import {
  IRefreshTokenRepository,
  IRefreshToken
} from '../IRefreshTokenRepository'

class TypeormRefreshTokensRepository implements IRefreshTokenRepository {
  private repository: Repository<RefreshToken>

  constructor() {
    this.repository = getRepository(RefreshToken)
  }

  async update(refreshToken: IRefreshToken): Promise<IRefreshToken> {
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
}
export { TypeormRefreshTokensRepository }
