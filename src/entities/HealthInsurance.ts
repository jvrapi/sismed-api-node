import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

import { BankData } from './BankData'
import { HealthInsuranceType } from './HealthInsuranceType'
import { Procedure } from './Procedure'

@Entity('health_insurances')
class HealthInsurance {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @Column('varchar', { name: 'name', length: 45 })
  name: string

  @Column('date', { name: 'accession_date' })
  accessionDate: string

  @Column('varchar', { name: 'cnpj', nullable: true, length: 14 })
  cnpj: string | null

  @Column('varchar', { name: 'ans_register', nullable: true, length: 6 })
  ansRegister: string | null

  @Column('int', { name: 'bank_data_id', nullable: true })
  bankDataId: number | null

  @ManyToOne(() => BankData, bankData => bankData.healthInsurances, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
  })
  @JoinColumn([{ name: 'bank_data_id', referencedColumnName: 'id' }])
  bankData: BankData

  @OneToMany(
    () => HealthInsuranceType,
    healthInsuranceType => healthInsuranceType.healthInsurance
  )
  healthInsuranceTypes: HealthInsuranceType[]

  @OneToMany(() => Procedure, procedure => procedure.healthInsurance)
  procedures: Procedure[]
}

export { HealthInsurance }
