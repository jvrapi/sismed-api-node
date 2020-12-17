import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Agenda from './SismedAgenda';
import Exame from './SismedExame';
import FuncionarioTconvenio from './SismedFuncionarioTconvenio';
import LaboratorioTconvenio from './SismedLaboratorioTconvenio';
import Paciente from './SismedPaciente';
import Convenio from './SismedConvenio';

@Entity('sismed_tipo_convenio')
export default class SismedTipoConvenio {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'convenio_id' })
  convenioId: number;

  @Column('varchar', { name: 'nome', length: 45 })
  nome: string;

  @OneToMany(() => Agenda, (Agenda) => Agenda.tipoConvenio)
  Agenda: Agenda[];

  @OneToMany(() => Exame, (Exame) => Exame.tipoConvenio)
  exames: Exame[];

  @OneToMany(
    () => FuncionarioTconvenio,
    (FuncionarioTconvenio) => FuncionarioTconvenio.tipoConvenio,
  )
  funcionarioTconvenios: FuncionarioTconvenio[];

  @OneToMany(
    () => LaboratorioTconvenio,
    (LaboratorioTconvenio) => LaboratorioTconvenio.tipoConvenio,
  )
  laboratorioTconvenios: LaboratorioTconvenio[];

  @OneToMany(
    () => Paciente,
    (Paciente) => Paciente.tipoConvenio,
  )
  pacientes: Paciente[];

  @ManyToOne(
    () => Convenio,
    (Convenio) => Convenio.tipoConvenios,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'convenio_id', referencedColumnName: 'id' }])
  convenio: Convenio;
}
