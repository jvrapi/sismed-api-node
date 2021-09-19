import { Request, Response } from 'express'
import { RefreshTokenService } from '../services/RefreshTokenService'
class RefreshTokenController {
  constructor(private service: RefreshTokenService) { }
  async handle(request: Request, response: Response) {
    const { refreshTokenId } = request.body
    const refreshToken = await this.service.execute(refreshTokenId)
    return response.json(refreshToken)
  }
}
export { RefreshTokenController }
