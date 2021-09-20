import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

import { Address } from './Address'
import { Exam } from './Exam'
import { HealthInsuranceType } from './HealthInsuranceType'

@Entity('labs')
class Lab {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  cnpj: string

  @Column()
  name: string

  @Column()
  responsible: string

  @Column()
  phone: string

  @Column()
  email?: string | null

  @Column()
  addressId: number

  @OneToMany(() => Exam, exam => exam.lab)
  exams: Exam[]

  @ManyToOne(() => Address, address => address.labs, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'address_id', referencedColumnName: 'id' }])
  address: Address

  @ManyToMany(
    () => HealthInsuranceType,
    healthInsuranceType => healthInsuranceType.labs
  )
  healthInsuranceTypes: HealthInsuranceType[]
}
export { Lab }
