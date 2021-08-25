import Employee from '@entities/Employee'

interface IEmployeeRepository {
  listAll(): Promise<Employee[]>
  getById(id: number): Promise<Employee>
  update(employee: Employee): Promise<Employee>
  save(employee: Employee): Promise<Employee>
  delete(employeeId: number): Promise<String>
}

export { IEmployeeRepository }
