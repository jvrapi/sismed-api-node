import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

import { HealthInsurance } from './HealthInsurance'
import { Schedule } from './Schedule'

@Entity('procedures')
class Procedure {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  value: number

  @Column()
  healthInsuranceId: number | null

  @ManyToOne(
    () => HealthInsurance,
    healthInsurance => healthInsurance.procedures,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn([{ name: 'health_insurance_id', referencedColumnName: 'id' }])
  healthInsurance: HealthInsurance

  @OneToMany(() => Schedule, schedule => schedule.procedure)
  schedules: Schedule[]
}

export { Procedure }
