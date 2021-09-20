import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { HealthInsurance } from './HealthInsurance'

@Entity('bank_datas')
class BankData {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  bank: string

  @Column()
  agency: string

  @Column()
  account: string

  @OneToMany(() => HealthInsurance, healthInsurance => healthInsurance.bankData)
  healthInsurances: HealthInsurance[]
}

export { BankData }
