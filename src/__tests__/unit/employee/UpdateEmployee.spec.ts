import { IEmployeeRepository } from '../../../modules/employees/repositories/IEmployeeRepository'
import { InMemoryEmployeesRepository } from '../../../modules/employees/repositories/in-memory/InMemoryEmployeesRepository'
import { CreateEmployeeService } from '../../../modules/employees/services/CreateEmployeeService'
import { UpdateEmployeeService } from '../../../modules/employees/services/UpdateEmployeeService'

describe('Update Employee', () => {
  let createNewEmployeeRepository: IEmployeeRepository
  let createEmployeeService: CreateEmployeeService
  let updateEmployeeService: UpdateEmployeeService

  const employeeData = {
    name: 'Alexandre Renan Silveira',
    cpf: '07202007762',
    rg: '284301383',
    email: 'alexandrerenansilveira_@lexos.com.br',
    dateBirth: new Date('1999-07-06'),
    beginDate: new Date(),
    cellNumber: '21999215617',
    phone: '2136254129',
    emittingDate: new Date('2018-30-06'),
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

  beforeAll(async () => {
    createNewEmployeeRepository = new InMemoryEmployeesRepository()
    createEmployeeService = new CreateEmployeeService(
      createNewEmployeeRepository
    )
    updateEmployeeService = new UpdateEmployeeService(
      createNewEmployeeRepository
    )
  })

  it('should be able to update an employee', async () => {
    const employee = await createEmployeeService.execute(employeeData)
    employee.dismissalDate = new Date('2021-09-15')

    const updatedEmployee = await updateEmployeeService.execute(employee)

    expect(typeof updatedEmployee).toBe('object')
    expect(updatedEmployee.dismissalDate).toBeInstanceOf(Date)
  })

  it('should not be able to update an employee with existing data', async () => {
    const newEmployee = {
      ...employeeData,
      name: 'Raquel Maitê Daiane Silveira',
      cpf: '07202007761',
      rg: '289153281',
      email: 'raquelmaitedaianesilveira-90@gmx.com',
      sex: 'F'
    }

    const employeeCreated = await createEmployeeService.execute(newEmployee)
    employeeCreated.cpf = employeeData.cpf
    employeeCreated.rg = employeeData.rg
    await expect(
      updateEmployeeService.execute(employeeCreated)
    ).rejects.toEqual(new Error('Cannot update employee'))
  })
})
