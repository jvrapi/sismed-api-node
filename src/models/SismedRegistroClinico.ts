import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import SismedPaciente from './SismedPaciente';
import SismedAgenda from './SismedAgenda';
import SismedFuncionario from './SismedFuncionario';

@Entity('sismed_registro_clinico', { schema: 'macmassc_sismed' })
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
    () => SismedPaciente,
    (sismedPaciente) => sismedPaciente.sismedRegistroClinicos,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'paciente_id', referencedColumnName: 'prontuario' }])
  paciente: SismedPaciente;

  @ManyToOne(
    () => SismedAgenda,
    (sismedAgenda) => sismedAgenda.sismedRegistroClinicos,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'agendamento_id', referencedColumnName: 'id' }])
  agendamento: SismedAgenda;

  @ManyToOne(
    () => SismedFuncionario,
    (sismedFuncionario) => sismedFuncionario.sismedRegistroClinicos,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'funcionario_id', referencedColumnName: 'id' }])
  funcionario: SismedFuncionario;
}
