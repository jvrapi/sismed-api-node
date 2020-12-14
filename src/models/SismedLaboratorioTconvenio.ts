import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import SismedLaboratorio from './SismedLaboratorio';
import SismedTipoConvenio from './SismedTipoConvenio';

@Entity('sismed_laboratorio_tconvenio', { schema: 'macmassc_sismed' })
export default class SismedLaboratorioTconvenio {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'tipo_convenio_id' })
  tipoConvenioId: number;

  @Column('int', { name: 'laboratorio_id' })
  laboratorioId: number;

  @ManyToOne(
    () => SismedLaboratorio,
    (sismedLaboratorio) => sismedLaboratorio.sismedLaboratorioTconvenios,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'laboratorio_id', referencedColumnName: 'id' }])
  laboratorio: SismedLaboratorio;

  @ManyToOne(
    () => SismedTipoConvenio,
    (sismedTipoConvenio) => sismedTipoConvenio.sismedLaboratorioTconvenios,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'tipo_convenio_id', referencedColumnName: 'id' }])
  tipoConvenio: SismedTipoConvenio;
}
