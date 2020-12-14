import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import SismedAgenda from './SismedAgenda';
import SismedCustos from './SismedCustos';
import SismedExame from './SismedExame';
import SismedTipoConvenio from './SismedTipoConvenio';
import SismedEndereco from './SismedEndereco';
import SismedRegistroClinico from './SismedRegistroClinico';

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

  @OneToMany(() => SismedAgenda, (sismedAgenda) => sismedAgenda.paciente)
  sismedAgenda: SismedAgenda[];

  @OneToMany(() => SismedCustos, (sismedCustos) => sismedCustos.paciente2)
  sismedCustos: SismedCustos[];

  @OneToMany(() => SismedExame, (sismedExame) => sismedExame.paciente)
  sismedExames: SismedExame[];

  @ManyToOne(
    () => SismedTipoConvenio,
    (sismedTipoConvenio) => sismedTipoConvenio.sismedPacientes,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'tipo_convenio', referencedColumnName: 'id' }])
  tipoConvenio: SismedTipoConvenio;

  @ManyToOne(
    () => SismedEndereco,
    (sismedEndereco) => sismedEndereco.sismedPacientes,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'endereco_id', referencedColumnName: 'id' }])
  endereco: SismedEndereco;

  @OneToMany(
    () => SismedRegistroClinico,
    (sismedRegistroClinico) => sismedRegistroClinico.paciente,
  )
  sismedRegistroClinicos: SismedRegistroClinico[];
}
