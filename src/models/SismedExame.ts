import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Paciente from './SismedPaciente';
import TipoConvenio from './SismedTipoConvenio';
import Funcionario from './SismedFuncionario';
import Laboratorio from './SismedLaboratorio';

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
    () => Paciente,
    (Paciente) => Paciente.exames,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'paciente_id', referencedColumnName: 'prontuario' }])
  paciente: Paciente;

  @ManyToOne(
    () => TipoConvenio,
    (TipoConvenio) => TipoConvenio.exames,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'tipo_convenio_id', referencedColumnName: 'id' }])
  tipoConvenio: TipoConvenio;

  @ManyToOne(
    () => Funcionario,
    (Funcionario) => Funcionario.exames,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'funcionario_id', referencedColumnName: 'id' }])
  funcionario: Funcionario;

  @ManyToOne(
    () => Laboratorio,
    (Laboratorio) => Laboratorio.exames,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'laboratorio_id', referencedColumnName: 'id' }])
  laboratorio: Laboratorio;
}
