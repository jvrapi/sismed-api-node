import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

import { Lab } from './Lab'
import { Patient } from './Patient'

@Entity('exams')
class Exam {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column({ name: 'collection_date' })
  collectionDate: string

  @Column({ name: 'send_date' })
  sendDate: string

  @Column({ name: 'return_date' })
  returnDate?: string | null

  @Column({ name: 'lab_employee' })
  labEmployee: string

  @Column()
  value: string

  @Column({ name: 'patient_id' })
  patientId: number

  @Column({ name: 'lab_id' })
  labId: number

  @ManyToOne(() => Lab, lab => lab.exams, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'lab_id', referencedColumnName: 'id' }])
  lab: Lab

  @ManyToOne(() => Patient, patient => patient.exams, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'patient_id', referencedColumnName: 'id' }])
  patient: Patient
}

export { Exam }
