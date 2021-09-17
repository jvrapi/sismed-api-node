import { app } from '../../../app'
import request from 'supertest'
import { connection } from '../../../../typeorm/connection'
import { sign } from 'jsonwebtoken'

describe('Request to list all employees', () => {
  let token = ''
  beforeAll(async () => {
    const secret = process.env.TOKEN_KEY || 'secret'

    token = sign({}, secret, { expiresIn: '60s' })

    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should be able to list all employees on request', async () => {
    const response = await request(app)
      .get('/employees/')
      .set('authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.some(element => element.password)).toBe(false)
  })
})
