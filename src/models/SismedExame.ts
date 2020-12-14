import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import SismedPaciente from './SismedPaciente';
import SismedTipoConvenio from './SismedTipoConvenio';
import SismedFuncionario from './SismedFuncionario';
import SismedLaboratorio from './SismedLaboratorio';

@Entity('sismed_exame', { schema: 'macmassc_sismed' })
export default class SismedExame {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nome', length: 50 })
  nome: string;

  @Column('varchar', { name: 'descricao', length: 250 })
  descricao: string;

  @Column('date', { name: 'data_coleta' })
  dataColeta: string;

  @Column('date', { name: 'data_envio' })
  dataEnvio: string;

  @Column('date', { name: 'data_retorno', nullable: true })
  dataRetorno: string | null;

  @Column('varchar', { name: 'funcionario_laboratorio', length: 45 })
  funcionarioLaboratorio: string;

  @Column('decimal', {
    name: 'valor',
    precision: 7,
    scale: 2,
    default: () => "'0.00'",
  })
  valor: string;

  @Column('int', { name: 'tipo_convenio_id' })
  tipoConvenioId: number;

  @Column('int', { name: 'paciente_id' })
  pacienteId: number;

  @Column('int', { name: 'funcionario_id' })
  funcionarioId: number;

  @Column('int', { name: 'laboratorio_id' })
  laboratorioId: number;

  @ManyToOne(
    () => SismedPaciente,
    (sismedPaciente) => sismedPaciente.sismedExames,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'paciente_id', referencedColumnName: 'prontuario' }])
  paciente: SismedPaciente;

  @ManyToOne(
    () => SismedTipoConvenio,
    (sismedTipoConvenio) => sismedTipoConvenio.sismedExames,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'tipo_convenio_id', referencedColumnName: 'id' }])
  tipoConvenio: SismedTipoConvenio;

  @ManyToOne(
    () => SismedFuncionario,
    (sismedFuncionario) => sismedFuncionario.sismedExames,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'funcionario_id', referencedColumnName: 'id' }])
  funcionario: SismedFuncionario;

  @ManyToOne(
    () => SismedLaboratorio,
    (sismedLaboratorio) => sismedLaboratorio.sismedExames,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'laboratorio_id', referencedColumnName: 'id' }])
  laboratorio: SismedLaboratorio;
}
