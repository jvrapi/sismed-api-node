import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Laboratorio from './SismedLaboratorio';
import TipoConvenio from './SismedTipoConvenio';

@Entity('sismed_laboratorio_tconvenio')
export default class SismedLaboratorioTconvenio {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'tipo_convenio_id' })
  tipoConvenioId: number;

  @Column('int', { name: 'laboratorio_id' })
  laboratorioId: number;

  @ManyToOne(
    () => Laboratorio,
    (Laboratorio) => Laboratorio.LaboratorioTconvenios,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'laboratorio_id', referencedColumnName: 'id' }])
  laboratorio: Laboratorio;

  @ManyToOne(
    () => TipoConvenio,
    (TipoConvenio) => TipoConvenio.laboratorioTconvenios,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'tipo_convenio_id', referencedColumnName: 'id' }])
  tipoConvenio: TipoConvenio;
}
