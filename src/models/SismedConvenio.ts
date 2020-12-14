import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import SismedDadosBancarios from './SismedDadosBancarios';
import SismedCustos from './SismedCustos';
import SismedProcedimento from './SismedProcedimento';
import SismedTipoConvenio from './SismedTipoConvenio';

@Entity('sismed_convenio', { schema: 'macmassc_sismed' })
export default class SismedConvenio {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nome', length: 45 })
  nome: string;

  @Column('date', { name: 'data_adesao' })
  dataAdesao: string;

  @Column('varchar', { name: 'cnpj', nullable: true, length: 14 })
  cnpj: string | null;

  @Column('varchar', { name: 'registro_ans', nullable: true, length: 6 })
  registroAns: string | null;

  @Column('int', { name: 'dados_bancarios', nullable: true })
  dadosBancarios: number | null;

  @ManyToOne(
    () => SismedDadosBancarios,
    (sismedDadosBancarios) => sismedDadosBancarios.sismedConvenios,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'dados_bancarios', referencedColumnName: 'id' }])
  dadosBancarios2: SismedDadosBancarios;

  @OneToMany(() => SismedCustos, (sismedCustos) => sismedCustos.convenio2)
  sismedCustos: SismedCustos[];

  @OneToMany(
    () => SismedProcedimento,
    (sismedProcedimento) => sismedProcedimento.convenio,
  )
  sismedProcedimentos: SismedProcedimento[];

  @OneToMany(
    () => SismedTipoConvenio,
    (sismedTipoConvenio) => sismedTipoConvenio.convenio,
  )
  sismedTipoConvenios: SismedTipoConvenio[];
}
