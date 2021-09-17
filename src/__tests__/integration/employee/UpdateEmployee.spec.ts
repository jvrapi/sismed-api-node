import { app } from '../../../app'
import request from 'supertest'
import { connection } from '../../../../typeorm/connection'
import { sign } from 'jsonwebtoken'

describe('Request to update employee informations', () => {
  const employeeData = {
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
  let token = ''
  beforeAll(async () => {
    const secret = process.env.TOKEN_KEY || 'secret'

    token = sign({}, secret, { expiresIn: '60s' })

    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
  })
  it('should be able to update an employee on request', async () => {
    const employeeCreated = await request(app)
      .post('/employees/')
      .set('authorization', `Bearer ${token}`)
      .send(employeeData)

    employeeCreated.body.dismissalDate = '2021-09-15'

    const employeeUpdated = await request(app)
      .put('/employees/')
      .set('authorization', `Bearer ${token}`)
      .send(employeeCreated.body)

    expect(employeeUpdated.status).toEqual(200)
    expect(typeof employeeUpdated.body).toBe('object')
    expect(typeof employeeUpdated.body.dismissalDate).toBe('string')
  })
})
