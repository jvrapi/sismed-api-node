import { sign } from 'jsonwebtoken'
class GenerateTokenProvider {
  async execute(employeeId: number) {
    const secret = process.env.TOKEN_KEY || 'secret'
    const token = sign({}, secret, {
      expiresIn: '1200s',
      subject: employeeId.toString()
    })

    return token
  }
}
export { GenerateTokenProvider }
