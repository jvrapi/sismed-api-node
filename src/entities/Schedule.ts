import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

import { ClinicalRecord } from './ClinicalRecord'
import { Employee } from './Employee'
import { HealthInsuranceType } from './HealthInsuranceType'
import { Patient } from './Patient'
import { Procedure } from './Procedure'

@Entity('schedules')
class Schedule {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  date: string

  @Column()
  time: string

  @Column({ name: 'first_time' })
  firstTime?: boolean | null

  @Column()
  attended?: boolean | null

  @Column()
  paid?: boolean | null

  @Column()
  rescheduled?: boolean | null

  @Column()
  finished: boolean | null

  @Column()
  notes?: string | null

  @Column({ name: 'employee_id' })
  employeeId: number

  @Column({ name: 'patient_id' })
  patientId: number

  @Column({ name: 'health_insurance_type_id' })
  healthInsuranceTypeId: number

  @Column({ name: 'procedure_id' })
  procedureId: number

  @OneToMany(() => ClinicalRecord, clinicalRecord => clinicalRecord.schedule)
  clinicalRecords: ClinicalRecord[]

  @ManyToOne(() => Employee, employee => employee.schedules, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'employee_id', referencedColumnName: 'id' }])
  employee: Employee

  @ManyToOne(
    () => HealthInsuranceType,
    healthInsuranceType => healthInsuranceType.schedules,
    { onDelete: 'NO ACTION', onUpdate: 'CASCADE' }
  )
  @JoinColumn([
    { name: 'health_insurance_type_id', referencedColumnName: 'id' }
  ])
  healthInsuranceType: HealthInsuranceType

  @ManyToOne(() => Patient, patient => patient.schedules, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
    cascade: true
  })
  @JoinColumn([{ name: 'patient_id', referencedColumnName: 'id' }])
  patient: Patient

  @ManyToOne(() => Procedure, procedure => procedure.schedules, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'procedure_id', referencedColumnName: 'id' }])
  procedure: Procedure
}
export { Schedule }
