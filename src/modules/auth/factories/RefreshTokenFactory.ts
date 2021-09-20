import { RefreshTokenController } from '../controllers/RefreshTokenController'
import { TypeormRefreshTokensRepository } from '../repositories/typeorm/TypeormRefreshTokensRepository'
import { RefreshTokenService } from '../services/RefreshTokenService'

const refreshTokenFactory = () => {
  const repository = new TypeormRefreshTokensRepository()
  const service = new RefreshTokenService(repository)
  const controller = new RefreshTokenController(service)
  return controller
}

export { refreshTokenFactory }
