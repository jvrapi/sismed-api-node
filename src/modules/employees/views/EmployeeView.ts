import { Employee } from '../../../entities/Employee'

class EmployeeView {
  listEmployeesDetails(employees: Employee[]) {
    return employees.map(employee => {
      delete employee.password
      return employee
    })
  }

  listEmployeeDetails(employee: Employee) {
    delete employee.password
    return employee
  }
}

export { EmployeeView }
