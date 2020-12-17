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
import Relatorio from './SismedRelatorio';
import Exame from './SismedExame';
import TipoConvenio from './SismedTipoConvenio';
import Endereco from './SismedEndereco';
import RegistroClinico from './SismedRegistroClinico';

@Entity('sismed_paciente', { schema: 'macmassc_sismed' })
export default class SismedPaciente {
  @PrimaryGeneratedColumn({ type: 'int', name: 'prontuario' })
  prontuario: number;

  @Column('varchar', { name: 'nome', length: 60 })
  nome: string;

  @Column('int', { name: 'endereco_id', nullable: true })
  enderecoId: number | null;

  @Column('varchar', { name: 'cpf', nullable: true, length: 14 })
  cpf: string | null;

  @Column('varchar', { name: 'rg', nullable: true, length: 13 })
  rg: string | null;

  @Column('varchar', { name: 'orgao_emissor', nullable: true, length: 20 })
  orgaoEmissor: string | null;

  @Column('date', { name: 'data_emissao', nullable: true })
  dataEmissao: string | null;

  @Column('varchar', { name: 'telefone_fixo', nullable: true, length: 14 })
  telefoneFixo: string | null;

  @Column('varchar', { name: 'telefone_trabalho', nullable: true, length: 14 })
  telefoneTrabalho: string | null;

  @Column('varchar', { name: 'celular', nullable: true, length: 16 })
  celular: string | null;

  @Column('varchar', { name: 'sexo', nullable: true, length: 2 })
  sexo: string | null;

  @Column('date', { name: 'data_nascimento', nullable: true })
  dataNascimento: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 50 })
  email: string | null;

  @Column('varchar', { name: 'estado_civil', nullable: true, length: 1 })
  estadoCivil: string | null;

  @Column('varchar', { name: 'escolaridade', nullable: true, length: 20 })
  escolaridade: string | null;

  @Column('varchar', { name: 'profissao', nullable: true, length: 100 })
  profissao: string | null;

  @Column('varchar', { name: 'recomendacao', nullable: true, length: 30 })
  recomendacao: string | null;

  @Column('varchar', { name: 'naturalidade', nullable: true, length: 100 })
  naturalidade: string | null;

  @Column('varchar', { name: 'nacionalidade', nullable: true, length: 1 })
  nacionalidade: string | null;

  @Column('varchar', { name: 'situacao', nullable: true, length: 2 })
  situacao: string | null;

  @Column('varchar', { name: 'carteira_convenio', nullable: true, length: 50 })
  carteiraConvenio: string | null;

  @Column('date', { name: 'validade', nullable: true })
  validade: string | null;

  @OneToMany(() => Agenda, (Agenda) => Agenda.paciente)
  agenda: Agenda[];

  @OneToMany(() => Relatorio, (Relatorio) => Relatorio.paciente2)
  relatorio: Relatorio[];

  @OneToMany(() => Exame, (Exame) => Exame.paciente)
  exames: Exame[];

  @ManyToOne(
    () => TipoConvenio,
    (TipoConvenio) => TipoConvenio.pacientes,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'tipo_convenio', referencedColumnName: 'id' }])
  tipoConvenio: TipoConvenio;

  @ManyToOne(
    () => Endereco,
    (Endereco) => Endereco.pacientes,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT', cascade: true },
  )
  @JoinColumn([{ name: 'endereco_id', referencedColumnName: 'id' }])
  endereco: Endereco;

  @OneToMany(
    () => RegistroClinico,
    (RegistroClinico) => RegistroClinico.paciente,
  )
  registroClinicos: RegistroClinico[];
}
