import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import SismedPaciente from './SismedPaciente';
import SismedFuncionario from './SismedFuncionario';
import SismedProcedimento from './SismedProcedimento';
import SismedTipoConvenio from './SismedTipoConvenio';
import SismedCustos from './SismedCustos';
import SismedRegistroClinico from './SismedRegistroClinico';

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
    () => SismedPaciente,
    (sismedPaciente) => sismedPaciente.sismedAgenda,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'paciente_id', referencedColumnName: 'prontuario' }])
  paciente: SismedPaciente;

  @ManyToOne(
    () => SismedFuncionario,
    (sismedFuncionario) => sismedFuncionario.sismedAgenda,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'funcionario_id', referencedColumnName: 'id' }])
  funcionario: SismedFuncionario;

  @ManyToOne(
    () => SismedProcedimento,
    (sismedProcedimento) => sismedProcedimento.sismedAgenda,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'procedimento_id', referencedColumnName: 'id' }])
  procedimento: SismedProcedimento;

  @ManyToOne(
    () => SismedTipoConvenio,
    (sismedTipoConvenio) => sismedTipoConvenio.sismedAgenda,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'tipo_convenio_id', referencedColumnName: 'id' }])
  tipoConvenio: SismedTipoConvenio;

  @OneToMany(() => SismedCustos, (sismedCustos) => sismedCustos.agendamento2)
  sismedCustos: SismedCustos[];

  @OneToMany(
    () => SismedRegistroClinico,
    (sismedRegistroClinico) => sismedRegistroClinico.agendamento,
  )
  sismedRegistroClinicos: SismedRegistroClinico[];
}
