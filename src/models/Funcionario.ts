import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Agenda } from "./Agenda";
import { Exame } from "./Exame";
import { Endereco } from "./Endereco";
import { Perfil } from "./Perfil";
import { FuncionarioTconvenio } from "./FuncionarioTconvenio";
import { Log } from "./Log";
import { RegistroClinico } from "./RegistroClinico";
import { Relatorio } from "./Relatorio";

@Index("cpf", ["cpf"], { unique: true })
@Index("rg", ["rg"], { unique: true })
@Index("crm_UNIQUE", ["crm"], { unique: true })
@Index("fk_sismed_funcionario_sismed_endereco1_idx", ["enderecoId"], {})
@Index("FK_sismed_funcionario_sismed_perfil", ["perfilId"], {})
@Entity("funcionario", { schema: "macmassc_sismed" })
export class Funcionario {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "endereco_id" })
  enderecoId: number;

  @Column("int", { name: "perfil_id" })
  perfilId: number;

  @Column("varchar", { name: "nome", length: 45 })
  nome: string;

  @Column("varchar", { name: "cpf", unique: true, length: 11 })
  cpf: string;

  @Column("varchar", { name: "rg", unique: true, length: 9 })
  rg: string;

  @Column("varchar", { name: "orgao_emissor", length: 45 })
  orgaoEmissor: string;

  @Column("date", { name: "data_emissao" })
  dataEmissao: string;

  @Column("bigint", { name: "crm", nullable: true, unique: true })
  crm: string | null;

  @Column("varchar", { name: "especialidade", nullable: true, length: 45 })
  especialidade: string | null;

  @Column("varchar", { name: "telefone_fixo", length: 10 })
  telefoneFixo: string;

  @Column("varchar", { name: "celular", length: 11 })
  celular: string;

  @Column("varchar", { name: "sexo", length: 3 })
  sexo: string;

  @Column("date", { name: "data_nascimento" })
  dataNascimento: string;

  @Column("varchar", { name: "email", length: 45 })
  email: string;

  @Column("varchar", { name: "estado_civil", length: 1 })
  estadoCivil: string;

  @Column("varchar", { name: "escolaridade", length: 3 })
  escolaridade: string;

  @Column("varchar", { name: "naturalidade", length: 45 })
  naturalidade: string;

  @Column("date", { name: "data_inicio", nullable: true })
  dataInicio: string;

  @Column("date", { name: "data_termino", nullable: true })
  dataTermino: string | null;

  @Column("varchar", { name: "nacionalidade", nullable: true, length: 1 })
  nacionalidade: string;

  @Column("varchar", { name: "codigo", nullable: true, length: 16 })
  codigo: string | null;

  @Column("varchar", { name: "senha", nullable: true, length: 255 })
  senha: string;

  @OneToMany(() => Agenda, (agenda) => agenda.funcionario)
  agenda: Agenda[];

  @OneToMany(() => Exame, (exame) => exame.funcionario)
  exames: Exame[];

  @ManyToOne(() => Endereco, (endereco) => endereco.funcionarios, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "endereco_id", referencedColumnName: "id" }])
  endereco: Endereco;

  @ManyToOne(() => Perfil, (perfil) => perfil.funcionarios, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "perfil_id", referencedColumnName: "id" }])
  perfil: Perfil;

  @OneToMany(
    () => FuncionarioTconvenio,
    (funcionarioTconvenio) => funcionarioTconvenio.funcionario
  )
  funcionarioTconvenios: FuncionarioTconvenio[];

  @OneToMany(() => Log, (log) => log.funcionario)
  logs: Log[];

  @OneToMany(
    () => RegistroClinico,
    (registroClinico) => registroClinico.funcionario
  )
  registroClinicos: RegistroClinico[];

  @OneToMany(() => Relatorio, (relatorio) => relatorio.funcionario2)
  relatorios: Relatorio[];
}
