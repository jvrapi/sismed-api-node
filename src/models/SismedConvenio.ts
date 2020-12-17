import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import DadosBancarios from './SismedDadosBancarios';
import Relatorio from './SismedRelatorio';
import Procedimento from './SismedProcedimento';
import TipoConvenio from './SismedTipoConvenio';

@Entity('sismed_convenio')
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
    () => DadosBancarios,
    (DadosBancarios) => DadosBancarios.convenios,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'dados_bancarios', referencedColumnName: 'id' }])
  dadosBancarios2: DadosBancarios;

  @OneToMany(() => Relatorio, (Relatorio) => Relatorio.convenio2)
  relatorio: Relatorio[];

  @OneToMany(
    () => Procedimento,
    (Procedimento) => Procedimento.convenio,
  )
  procedimentos: Procedimento[];

  @OneToMany(
    () => TipoConvenio,
    (TipoConvenio) => TipoConvenio.convenio,
  )
  tipoConvenios: TipoConvenio[];
}
