import { sign } from 'jsonwebtoken'
import { connection } from '../../../typeorm/connection'
import { app } from '../../app'
import request from 'supertest'
import { RefreshToken } from '../../entities/RefreshToken'

interface EmployeeAuthenticated {
  token: string
  name: string
  refreshToken: RefreshToken
}

describe('Request to refresh token', () => {
  let employeeData = {
    id: null,
    name: 'Alexandre Renan Silveira',
    cpf: '07202007762',
    rg: '284301383',
    email: 'alexandrerenansilveira_@lexos.com.br',
    dateBirth: '1999-07-06',
    beginDate: '2021-09-16',
    cellNumber: '21999215617',
    phone: '2136254129',
    emittingDate: '2018-06-30',
    emittingOrgan: 'DetranRJ',
    maritalStatus: 'S',
    nationality: 'B',
    naturalness: 'Rio de Janeiro',
    password: '4bz8JFBaGF',
    schooling: 'EMC',
    sex: 'M',
    address: {
      zipCode: '22780807',
      street: 'Rua Marilena',
      number: 109,
      neighborhood: 'Curicica',
      city: 'Rio de Janeiro',
      state: 'RJ'
    }
  }

  let authenticated: EmployeeAuthenticated

  let token = ''
  beforeAll(async () => {
    const secret = process.env.TOKEN_KEY || 'secret'

    token = sign({}, secret, { expiresIn: '60s' })
    await connection.connect()

    const response = await request(app)
      .post('/employees/')
      .set('authorization', `Bearer ${token}`)
      .send(employeeData)
    employeeData = response.body
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should be able to authenticate employee', async () => {
    const { status, body } = await request(app).post('/auth').send({
      username: employeeData.cpf,
      password: '4bz8JFBaGF'
    })

    authenticated = body

    expect(status).toEqual(200)
    expect(body).toHaveProperty('name')
    expect(body).toHaveProperty('token')
    expect(body).toHaveProperty('refreshToken')
  })

  it('should be able to create a new token by refresh token', async () => {
    await new Promise(resolve => setTimeout(resolve, 3000))
    const { body } = await request(app)
      .post('/auth/refresh-token')
      .send({ refreshTokenId: authenticated.refreshToken.id })

    expect(body.id).not.toEqual(authenticated.refreshToken.id)
    expect(token).not.toEqual(authenticated.token)
  })
})
jest.setTimeout(30000)
