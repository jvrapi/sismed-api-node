import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import SismedAgenda from './SismedAgenda';
import SismedExame from './SismedExame';
import SismedFuncionarioTconvenio from './SismedFuncionarioTconvenio';
import SismedLaboratorioTconvenio from './SismedLaboratorioTconvenio';
import SismedPaciente from './SismedPaciente';
import SismedConvenio from './SismedConvenio';

@Entity('sismed_tipo_convenio')
export default class SismedTipoConvenio {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'convenio_id' })
  convenioId: number;

  @Column('varchar', { name: 'nome', length: 45 })
  nome: string;

  @OneToMany(() => SismedAgenda, (sismedAgenda) => sismedAgenda.tipoConvenio)
  sismedAgenda: SismedAgenda[];

  @OneToMany(() => SismedExame, (sismedExame) => sismedExame.tipoConvenio)
  sismedExames: SismedExame[];

  @OneToMany(
    () => SismedFuncionarioTconvenio,
    (sismedFuncionarioTconvenio) => sismedFuncionarioTconvenio.tipoConvenio,
  )
  sismedFuncionarioTconvenios: SismedFuncionarioTconvenio[];

  @OneToMany(
    () => SismedLaboratorioTconvenio,
    (sismedLaboratorioTconvenio) => sismedLaboratorioTconvenio.tipoConvenio,
  )
  sismedLaboratorioTconvenios: SismedLaboratorioTconvenio[];

  @OneToMany(
    () => SismedPaciente,
    (sismedPaciente) => sismedPaciente.tipoConvenio,
  )
  sismedPacientes: SismedPaciente[];

  @ManyToOne(
    () => SismedConvenio,
    (sismedConvenio) => sismedConvenio.sismedTipoConvenios,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'convenio_id', referencedColumnName: 'id' }])
  convenio: SismedConvenio;
}
