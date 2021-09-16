export interface IRefreshToken {
  employeeId: number
  expiresIn: number
  id: string
}

interface IRefreshTokenRepository {
  update(refreshToken: IRefreshToken): Promise<IRefreshToken>
}

export { IRefreshTokenRepository }
