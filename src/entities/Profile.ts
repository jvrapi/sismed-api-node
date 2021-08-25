import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Employee } from './Employee'

@Entity('profiles')
class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @OneToMany(() => Employee, employee => employee.profile)
  employees: Employee[]
}
export { Profile }
