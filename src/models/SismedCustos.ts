import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import SismedConvenio from './SismedConvenio';
import SismedPaciente from './SismedPaciente';
import SismedFuncionario from './SismedFuncionario';
import SismedProcedimento from './SismedProcedimento';
import SismedAgenda from './SismedAgenda';

@Entity('sismed_custos', { schema: 'macmassc_sismed' })
export default class SismedCustos {
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
    () => SismedConvenio,
    (sismedConvenio) => sismedConvenio.sismedCustos,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'convenio', referencedColumnName: 'id' }])
  convenio2: SismedConvenio;

  @ManyToOne(
    () => SismedPaciente,
    (sismedPaciente) => sismedPaciente.sismedCustos,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'paciente', referencedColumnName: 'prontuario' }])
  paciente2: SismedPaciente;

  @ManyToOne(
    () => SismedFuncionario,
    (sismedFuncionario) => sismedFuncionario.sismedCustos,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'funcionario', referencedColumnName: 'id' }])
  funcionario2: SismedFuncionario;

  @ManyToOne(
    () => SismedProcedimento,
    (sismedProcedimento) => sismedProcedimento.sismedCustos,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'procedimento', referencedColumnName: 'id' }])
  procedimento2: SismedProcedimento;

  @ManyToOne(() => SismedAgenda, (sismedAgenda) => sismedAgenda.sismedCustos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'agendamento', referencedColumnName: 'id' }])
  agendamento2: SismedAgenda;
}
