import { app } from '../../../app'
import request from 'supertest'
import { connection } from '../../../../typeorm/connection'

describe('Request to list all employees', () => {
  beforeAll(async () => {
    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should be able to list all employees on request', async () => {
    const response = await request(app).get('/employees/')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.some(element => element.password)).toBe(false)
  })
})
