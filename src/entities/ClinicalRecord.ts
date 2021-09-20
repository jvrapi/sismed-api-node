import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

import { Employee } from './Employee'
import { Patient } from './Patient'
import { Schedule } from './Schedule'

@Entity('clinical_records')
class ClinicalRecord {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  date: string

  @Column()
  time: string

  @Column()
  description: string

  @Column({ name: 'employee_id' })
  employeeId: number

  @Column({ name: 'patient_id' })
  patientId: number

  @Column({ name: 'schedule_id', nullable: true })
  scheduleId: number | null

  @ManyToOne(() => Employee, employee => employee.clinicalRecords, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'employee_id', referencedColumnName: 'id' }])
  employee: Employee

  @ManyToOne(() => Patient, patient => patient.clinicalRecords, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'patient_id', referencedColumnName: 'id' }])
  patient: Patient

  @ManyToOne(() => Schedule, schedule => schedule.clinicalRecords, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'schedule_id', referencedColumnName: 'id' }])
  schedule: Schedule
}
export { ClinicalRecord }
