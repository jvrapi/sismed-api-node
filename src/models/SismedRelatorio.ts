import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Convenio from './SismedConvenio';
import Paciente from './SismedPaciente';
import Funcionario from './SismedFuncionario';
import Procedimento from './SismedProcedimento';
import Agenda from './SismedAgenda';

@Entity('sismed_relatorio')
export default class SismedRelatorio {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'paciente' })
  paciente: number;

  @Column('int', { name: 'convenio' })
  convenio: number;

  @Column('int', { name: 'procedimento' })
  procedimento: number;

  @Column('decimal', { name: 'valor', precision: 7, scale: 2 })
  valor: string;

  @Column('date', { name: 'data' })
  data: string;

  @Column('time', { name: 'hora' })
  hora: string;

  @Column('int', { name: 'funcionario' })
  funcionario: number;

  @Column('int', { name: 'agendamento' })
  agendamento: number;

  @ManyToOne(
    () => Convenio,
    (Convenio) => Convenio.relatorio,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'convenio', referencedColumnName: 'id' }])
  convenio2: Convenio;

  @ManyToOne(
    () => Paciente,
    (Paciente) => Paciente.relatorio,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'paciente', referencedColumnName: 'prontuario' }])
  paciente2: Paciente;

  @ManyToOne(
    () => Funcionario,
    (Funcionario) => Funcionario.relatorio,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'funcionario', referencedColumnName: 'id' }])
  funcionario2: Funcionario;

  @ManyToOne(
    () => Procedimento,
    (Procedimento) => Procedimento.relatorio,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'procedimento', referencedColumnName: 'id' }])
  procedimento2: Procedimento;

  @ManyToOne(() => Agenda, (Agenda) => Agenda.relatorio, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'agendamento', referencedColumnName: 'id' }])
  agendamento2: Agenda;
}
