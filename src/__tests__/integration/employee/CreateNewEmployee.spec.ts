import { app } from '../../../app'
import request from 'supertest'
import { connection } from '../../../../typeorm/connection'

describe('Request to create new employee', () => {
  beforeAll(async () => {
    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should be able to create a new employee', async () => {
    const employeeData = {
      name: 'Alexandre Renan Silveira',
      cpf: '07202007762',
      rg: '284301383',
      email: 'alexandrerenansilveira_@lexos.com.br',
      dateBirth: '1999-07-06',
      beginDate: new Date(),
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
    const response = await request(app).post('/employees/').send(employeeData)
    expect(response.status).toBe(201)
    expect(typeof response.body).toBe('object')
    expect(response.body).toHaveProperty('id')
    expect(response.body.address).toHaveProperty('id')
    expect(response.body).not.toHaveProperty('password')
  })
})
