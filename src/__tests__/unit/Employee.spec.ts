import { IEmployeeRepository } from '../../modules/employees/repositories/IEmployeeRepository'
import { InMemoryEmployeesRepository } from '../../modules/employees/repositories/in-memory/InMemoryEmployeesRepository'
import { CreateEmployeeService } from '../../modules/employees/services/CreateEmployeeService'
import { DeleteEmployeeService } from '../../modules/employees/services/DeleteEmployeeService'
import { ListEmployeesService } from '../../modules/employees/services/ListEmployeesService'
import { UpdateEmployeeService } from '../../modules/employees/services/UpdateEmployeeService'

describe('#Employees', () => {
  // Repositories
  let employeeRepository: IEmployeeRepository
  // Services
  let listAllEmployeesService: ListEmployeesService
  let createEmployeeService: CreateEmployeeService
  let updateEmployeeService: UpdateEmployeeService
  let deleteEmployeeService: DeleteEmployeeService

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

  beforeAll(async () => {
    // Repositores
    employeeRepository = new InMemoryEmployeesRepository()

    // Services
    createEmployeeService = new CreateEmployeeService(employeeRepository)
    listAllEmployeesService = new ListEmployeesService(employeeRepository)
    updateEmployeeService = new UpdateEmployeeService(employeeRepository)
    deleteEmployeeService = new DeleteEmployeeService(employeeRepository)
  })
  it('should be able to create a new employee', async () => {
    const employee = await createEmployeeService.execute(employeeData)
    employeeData = employee
    expect(typeof employee).toBe('object')
    expect(employee).toHaveProperty('id')
    expect(employee.address).toHaveProperty('id')
  })

  it('should be not able to create a user with an existing data', async () => {
    await expect(createEmployeeService.execute(employeeData)).rejects.toEqual(
      new Error('Employee already exists!')
    )
  })

  it('should be able to list all employees', async () => {
    const employees = await listAllEmployeesService.execute()
    expect(Array.isArray(employees)).toBe(true)
    expect(employees.length).toBeGreaterThanOrEqual(0)
  })

  it('should be able to update an employee', async () => {
    Object.assign(employeeData, {
      dismissalDate: '2021-09-15'
    })
    const updatedEmployee = await updateEmployeeService.execute(employeeData)

    expect(typeof updatedEmployee).toBe('object')
    expect(typeof updatedEmployee.dismissalDate).toEqual('string')
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

  it('should be able to delete an employee by id', async () => {
    const deleted = await deleteEmployeeService.execute(employeeData.id)

    expect(typeof deleted).toBe('string')
    expect(deleted).toEqual('Employee deleted successfully')
  })
})
