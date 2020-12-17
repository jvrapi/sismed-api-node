import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import Convenio from './SismedConvenio';

@Entity('sismed_dados_bancarios')
export default class SismedDadosBancarios {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'banco', length: 45 })
  banco: string;

  @Column('varchar', { name: 'agencia', length: 45 })
  agencia: string;

  @Column('varchar', { name: 'conta', length: 45 })
  conta: string;

  @OneToMany(
    () => Convenio,
    (Convenio) => Convenio.dadosBancarios2,
  )
  convenios: Convenio[];
}
