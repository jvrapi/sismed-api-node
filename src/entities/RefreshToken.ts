import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { Employee } from './Employee'

@Entity('refresh_tokens')
class RefreshToken {
  @PrimaryColumn()
  id: string

  @Column({ name: 'expires_in' })
  expiresIn: number

  @Column({ name: 'employee_id' })
  employeeId: number

  @OneToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee
}
export { RefreshToken }
