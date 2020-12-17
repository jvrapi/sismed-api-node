import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Paciente from './SismedPaciente';
import Funcionario from './SismedFuncionario';
import Procedimento from './SismedProcedimento';
import TipoConvenio from './SismedTipoConvenio';
import Relatorio from './SismedRelatorio';
import RegistroClinico from './SismedRegistroClinico';

@Entity('sismed_agenda', { schema: 'macmassc_sismed' })
export default class SismedAgenda {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'observacao', nullable: true, length: 255 })
  observacao: string | null;

  @Column('tinyint', { name: 'primeira_vez', default: () => "'1'" })
  primeiraVez: number;

  @Column('tinyint', { name: 'compareceu', width: 1, default: () => "'1'" })
  compareceu: boolean;

  @Column('tinyint', { name: 'pagou', width: 1, default: () => "'1'" })
  pagou: boolean;

  @Column('date', { name: 'data' })
  data: string;

  @Column('time', { name: 'hora' })
  hora: string;

  @Column('int', { name: 'procedimento_id' })
  procedimentoId: number;

  @Column('int', { name: 'tipo_convenio_id' })
  tipoConvenioId: number;

  @Column('int', { name: 'paciente_id' })
  pacienteId: number;

  @Column('int', { name: 'funcionario_id' })
  funcionarioId: number;

  @Column('int', { name: 'finalizado', nullable: true, default: () => "'0'" })
  finalizado: number | null;

  @ManyToOne(
    () => Paciente,
    (Paciente) => Paciente.agenda,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'paciente_id', referencedColumnName: 'prontuario' }])
  paciente: Paciente;

  @ManyToOne(
    () => Funcionario,
    (Funcionario) => Funcionario.Agenda,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'funcionario_id', referencedColumnName: 'id' }])
  funcionario: Funcionario;

  @ManyToOne(
    () => Procedimento,
    (Procedimento) => Procedimento.agenda,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'procedimento_id', referencedColumnName: 'id' }])
  procedimento: Procedimento;

  @ManyToOne(
    () => TipoConvenio,
    (TipoConvenio) => TipoConvenio.Agenda,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'tipo_convenio_id', referencedColumnName: 'id' }])
  tipoConvenio: TipoConvenio;

  @OneToMany(() => Relatorio, (Relatorio) => Relatorio.agendamento2)
  relatorio: Relatorio[];

  @OneToMany(
    () => RegistroClinico,
    (RegistroClinico) => RegistroClinico.agendamento,
  )
  registroClinicos: RegistroClinico[];
}
