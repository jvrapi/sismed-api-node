import { app } from '../../app'
import request from 'supertest'
import { connection } from '../../../typeorm/connection'
import { sign } from 'jsonwebtoken'

describe('Request to create new employee', () => {
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
  let token = ''
  beforeAll(async () => {
    const secret = process.env.TOKEN_KEY || 'secret'

    token = sign({}, secret, { expiresIn: '60s' })

    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should be able to create a new employee on request', async () => {
    const response = await request(app)
      .post('/employees/')
      .set('authorization', `Bearer ${token}`)
      .send(employeeData)
    employeeData = response.body
    expect(response.status).toBe(201)
    expect(typeof response.body).toBe('object')
    expect(response.body).toHaveProperty('id')
    expect(response.body.address).toHaveProperty('id')
    expect(response.body).not.toHaveProperty('password')
  })

  it('should be not able to create a user with an existing data', async () => {
    await request(app)
      .post('/employees/')
      .set('authorization', `Bearer ${token}`)
      .send(employeeData)
    const response = await request(app)
      .post('/employees/')
      .set('authorization', `Bearer ${token}`)
      .send(employeeData)
    expect(response.status).toEqual(400)
  })

  it('should be able to list all employees on request', async () => {
    const response = await request(app)
      .get('/employees/')
      .set('authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.some(element => element.password)).toBe(false)
  })
  it('should be able to update an employee on request', async () => {
    Object.assign(employeeData, {
      dismissalDate: '2021-09-15'
    })

    const employeeUpdated = await request(app)
      .put('/employees/')
      .set('authorization', `Bearer ${token}`)
      .send(employeeData)

    expect(employeeUpdated.status).toEqual(200)
    expect(typeof employeeUpdated.body).toBe('object')
    expect(typeof employeeUpdated.body.dismissalDate).toBe('string')
  })

  it('should be able to delete an employee by id on request', async () => {
    const employeeDeleted = await request(app)
      .delete(`/employees/${employeeData.id}/`)
      .set('authorization', `Bearer ${token}`)

    expect(employeeDeleted.status).toEqual(200)
    expect(typeof employeeDeleted.body).toBe('string')
    expect(employeeDeleted.body).toEqual('Employee deleted successfully')
  })
})
