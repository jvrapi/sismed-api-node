import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Employee } from './Employee'
// import Lab from './Lab'
// import Patient from './Patient'

@Entity('addresses')
class Address {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'zip_code' })
  zipCode: string | null

  @Column()
  street: string | null

  @Column()
  number: number | null

  @Column()
  complement?: string | null

  @Column()
  neighborhood: string | null

  @Column()
  city: string | null

  @Column()
  state: string | null

  @OneToMany(() => Employee, employee => employee.address)
  employees: Employee[]

  // @OneToMany(() => Lab, lab => lab.address)
  // labs: Lab[]

  // @OneToMany(() => Patient, patient => patient.address)
  // patients: Patient[]
}

export { Address }
