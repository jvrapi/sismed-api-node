import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

import { Address } from './Address'
// import ClinicalRecord from './ClinicalRecord'
// import HealthInsuranceType from './HealthInsuranceType'
// import Log from './Log'
import { Profile } from './Profile'
// import Schedule from './Schedule'

@Entity('employees')
class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  cpf: string

  @Column()
  rg: string

  @Column({ name: 'emitting_organ' })
  emittingOrgan: string

  @Column({ name: 'emitting_date' })
  emittingDate: string

  @Column()
  phone: string

  @Column({ name: 'cell_number' })
  cellNumber: string

  @Column()
  sex: string

  @Column({ name: 'date_birth' })
  dateBirth: string

  @Column()
  email: string

  @Column({ name: 'marital_status' })
  maritalStatus: string

  @Column()
  schooling: string

  @Column()
  naturalness: string

  @Column()
  nationality: string

  @Column({ name: 'begin_date' })
  beginDate: string

  @Column({ name: 'dismissal_date' })
  dismissalDate?: string | null

  @Column()
  crm?: string | null

  @Column()
  specialty?: string | null

  @Column({ name: 'recovery_code' })
  recoveryCode?: string | null

  @Column()
  password: string

  @Column({ name: 'address_id' })
  addressId: number

  @Column({ name: 'profile_id' })
  profileId: number

  // @OneToMany(() => ClinicalRecord, clinicalRecord => clinicalRecord.employee)
  // clinicalRecords: ClinicalRecord[]

  @ManyToOne(() => Address, address => address.employees, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
    cascade: true
  })
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  address: Address

  @ManyToOne(() => Profile, profile => profile.employees, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'profile_id', referencedColumnName: 'id' }])
  profile: Profile

  // @ManyToMany(
  //   () => HealthInsuranceType,
  //   healthInsuranceType => healthInsuranceType.employees
  // )
  // @JoinTable({
  //   name: 'employee_health_insurance_type',
  //   joinColumns: [{ name: 'employee_id', referencedColumnName: 'id' }],
  //   inverseJoinColumns: [
  //     { name: 'health_insurance_type_id', referencedColumnName: 'id' }
  //   ],
  //   schema: 'sismed'
  // })
  // healthInsuranceTypes: HealthInsuranceType[]

  // @OneToMany(() => Log, log => log.employee)
  // logs: Log[]

  // @OneToMany(() => Schedule, schedule => schedule.employee)
  // schedules: Schedule[]
}

export { Employee }
