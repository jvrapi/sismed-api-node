import { sign } from 'jsonwebtoken'
class GenerateTokenProvider {
  async execute(employeeId: number) {
    const secret = process.env.TOKEN_KEY || 'secret'
    const seconds = process.env.TEST ? '3s' : '1200s'

    const token = sign({}, secret, {
      expiresIn: seconds,
      subject: employeeId.toString()
    })

    return token
  }
}
export { GenerateTokenProvider }
