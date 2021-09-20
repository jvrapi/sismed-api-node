import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

import { Address } from './Address'
import { ClinicalRecord } from './ClinicalRecord'
import { Exam } from './Exam'
import { HealthInsuranceType } from './HealthInsuranceType'
import { Schedule } from './Schedule'

@Entity('patients')
class Patient {
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

  @Column({ name: 'job_phone' })
  jobPhone: string

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

  @Column()
  profession: string

  @Column()
  situation: string

  @Column()
  recommendation: string

  @Column({
    name: 'health_insurance_number'
  })
  healthInsuranceNumber: string

  @Column()
  validity: string

  @Column({ name: 'address_id' })
  addressId: number

  @Column({ name: 'health_insurance_type_id' })
  healthInsuranceTypeId: number

  @OneToMany(() => ClinicalRecord, clinicalRecord => clinicalRecord.patient)
  clinicalRecords: ClinicalRecord[]

  @OneToMany(() => Exam, exam => exam.patient)
  exams: Exam[]

  @ManyToOne(() => Address, address => address.patients, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
    cascade: true
  })
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  address: Address

  @ManyToOne(
    () => HealthInsuranceType,
    healthInsuranceType => healthInsuranceType.patients,
    { onDelete: 'NO ACTION', onUpdate: 'CASCADE' }
  )
  @JoinColumn([
    { name: 'health_insurance_type_id', referencedColumnName: 'id' }
  ])
  healthInsuranceType: HealthInsuranceType

  @OneToMany(() => Schedule, schedule => schedule.patient)
  schedules: Schedule[]
}

export { Patient }
