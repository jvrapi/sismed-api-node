import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Paciente from './SismedPaciente';
import Agenda from './SismedAgenda';
import Funcionario from './SismedFuncionario';

@Entity('sismed_registro_clinico')
export default class SismedRegistroClinico {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('date', { name: 'data' })
  data: string;

  @Column('time', { name: 'hora' })
  hora: string;

  @Column('varchar', { name: 'descricao', length: 1000 })
  descricao: string;

  @Column('int', { name: 'funcionario_id', nullable: true })
  funcionarioId: number | null;

  @Column('int', { name: 'agendamento_id', nullable: true })
  agendamentoId: number | null;

  @Column('int', { name: 'paciente_id', nullable: true })
  pacienteId: number | null;

  @ManyToOne(
    () => Paciente,
    (Paciente) => Paciente.registroClinicos,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'paciente_id', referencedColumnName: 'prontuario' }])
  paciente: Paciente;

  @ManyToOne(
    () => Agenda,
    (Agenda) => Agenda.registroClinicos,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'agendamento_id', referencedColumnName: 'id' }])
  agendamento: Agenda;

  @ManyToOne(
    () => Funcionario,
    (Funcionario) => Funcionario.registroClinicos,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'funcionario_id', referencedColumnName: 'id' }])
  funcionario: Funcionario;
}
