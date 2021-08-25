import { IEmployeeRepository } from '../../../modules/employees/repositories/IEmployeeRepository'
import { InMemoryEmployeesRepository } from '../../../modules/employees/repositories/in-memory/InMemoryEmployeesRepository'
import { ListEmployeesService } from '../../../modules/employees/services/ListEmployeesService'

describe('List All Employees Service', () => {
  let listAllEmployeesRepository: IEmployeeRepository
  let listAllEmployeesService: ListEmployeesService

  beforeAll(async () => {
    listAllEmployeesRepository = new InMemoryEmployeesRepository()
    listAllEmployeesService = new ListEmployeesService(
      listAllEmployeesRepository
    )
  })
  it('should be able to list all employees', async () => {
    const employees = await listAllEmployeesService.execute()
    expect(Array.isArray(employees)).toBe(true)
    expect(employees.length).toBe(0)
  })
})
