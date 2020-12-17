import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Agenda from './SismedAgenda';
import Relatorio from './SismedRelatorio';
import Convenio from './SismedConvenio';

@Entity('sismed_procedimento')
export default class SismedProcedimento {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'descricao', length: 45 })
  descricao: string;

  @Column('decimal', { name: 'valor', precision: 7, scale: 2 })
  valor: string;

  @Column('int', { name: 'convenio_id' })
  convenioId: number;

  @OneToMany(() => Agenda, (Agenda) => Agenda.procedimento)
  agenda: Agenda[];

  @OneToMany(() => Relatorio, (Relatorio) => Relatorio.procedimento2)
  relatorio: Relatorio[];

  @ManyToOne(
    () => Convenio,
    (Convenio) => Convenio.procedimentos,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'convenio_id', referencedColumnName: 'id' }])
  convenio: Convenio;
}
