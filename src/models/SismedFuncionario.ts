import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,

  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import Agenda from './SismedAgenda';
import Relatorio from './SismedRelatorio';
import Exame from './SismedExame';
import Endereco from './SismedEndereco';
import Perfil from './SismedPerfil';
import FuncionarioTconvenio from './SismedFuncionarioTconvenio';
import Log from './SismedLog';
import RegistroClinico from './SismedRegistroClinico';

@Entity('sismed_funcionario')
export default class SismedFuncionario {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'endereco_id' })
  enderecoId: number;

  @Column('int', { name: 'perfil_id', nullable: true })
  perfilId: number;

  @Column('varchar', { name: 'nome', length: 45 })
  nome: string;

  @Column('varchar', { name: 'cpf', unique: true, length: 11 })
  cpf: string;

  @Column('varchar', { name: 'rg', unique: true, length: 9 })
  rg: string;

  @Column('varchar', { name: 'orgao_emissor', length: 45 })
  orgaoEmissor: string;

  @Column('date', { name: 'data_emissao' })
  dataEmissao: string;

  @Column('bigint', { name: 'crm', nullable: true, unique: true })
  crm: string;

  @Column('varchar', { name: 'especialidade', nullable: true, length: 45 })
  especialidade: string;

  @Column('varchar', { name: 'telefone_fixo', length: 10 })
  telefoneFixo: string;

  @Column('varchar', { name: 'celular', length: 11 })
  celular: string;

  @Column('varchar', { name: 'sexo', length: 3 })
  sexo: string;

  @Column('date', { name: 'data_nascimento' })
  dataNascimento: string;

  @Column('varchar', { name: 'email', length: 45 })
  email: string;

  @Column('varchar', { name: 'estado_civil', length: 1 })
  estadoCivil: string;

  @Column('varchar', { name: 'escolaridade', length: 3 })
  escolaridade: string;

  @Column('varchar', { name: 'naturalidade', length: 45 })
  naturalidade: string;

  @Column('date', { name: 'data_inicio', nullable: true })
  dataInicio: string;

  @Column('date', { name: 'data_termino', nullable: true })
  dataTermino: string;

  @Column('varchar', { name: 'nacionalidade', nullable: true, length: 1 })
  nacionalidade: string;

  @Column('varchar', { name: 'codigo', nullable: true, length: 16 })
  codigo: string;

  @Column('varchar', { name: 'senha', length: 255 })
  senha: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.senha = bcrypt.hashSync(this.senha, 12);
  }

  @OneToMany(() => Agenda, (Agenda) => Agenda.funcionario)
  Agenda: Agenda[];

  @OneToMany(() => Relatorio, (Relatorio) => Relatorio.funcionario2)
  Relatorio: Relatorio[];

  @OneToMany(() => Exame, (Exame) => Exame.funcionario)
  Exames: Exame[];

  @ManyToOne(
    () => Endereco,
    (Endereco) => Endereco.funcionarios,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE', cascade: true },
  )
  @JoinColumn([{ name: 'endereco_id', referencedColumnName: 'id' }])
  endereco: Endereco;

  @ManyToOne(
    () => Perfil,
    (Perfil) => Perfil.funcionarios,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'perfil_id', referencedColumnName: 'id' }])
  perfil: Perfil;

  @OneToMany(
    () => FuncionarioTconvenio,
    (FuncionarioTconvenio) => FuncionarioTconvenio.funcionario,
  )
  funcionarioTconvenios: FuncionarioTconvenio[];

  @OneToMany(() => Log, (Log) => Log.funcionario)
  Logs: Log[];

  @OneToMany(
    () => RegistroClinico,
    (RegistroClinico) => RegistroClinico.funcionario,
  )
  registroClinicos: RegistroClinico[];
}
