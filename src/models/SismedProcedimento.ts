import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import SismedAgenda from './SismedAgenda';
import SismedRelatorio from './SismedRelatorio';
import SismedConvenio from './SismedConvenio';

@Entity('sismed_procedimento', { schema: 'macmassc_sismed' })
export default class SismedProcedimento {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'descricao', length: 45 })
  descricao: string;

  @Column('decimal', { name: 'valor', precision: 7, scale: 2 })
  valor: string;

  @Column('int', { name: 'convenio_id' })
  convenioId: number;

  @OneToMany(() => SismedAgenda, (sismedAgenda) => sismedAgenda.procedimento)
  sismedAgenda: SismedAgenda[];

  @OneToMany(() => SismedRelatorio, (sismedRelatorio) => sismedRelatorio.procedimento2)
  sismedRelatorio: SismedRelatorio[];

  @ManyToOne(
    () => SismedConvenio,
    (sismedConvenio) => sismedConvenio.sismedProcedimentos,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'convenio_id', referencedColumnName: 'id' }])
  convenio: SismedConvenio;
}
