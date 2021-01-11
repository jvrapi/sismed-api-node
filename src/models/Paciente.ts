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
import { TipoConvenio } from "./TipoConvenio";
import { RegistroClinico } from "./RegistroClinico";
import { Relatorio } from "./Relatorio";

@Index("fk_sismed_paciente_sismed_endereco1_idx", ["enderecoId"], {})
@Index("fk_sismed_paciente_sismed_tipo_convenio1_idx", ["tipoConvenioId"], {})
@Entity("paciente", { schema: "macmassc_sismed" })
export class Paciente {
  @PrimaryGeneratedColumn({ type: "int", name: "prontuario" })
  prontuario: number;

  @Column("varchar", { name: "nome", length: 60 })
  nome: string;

  @Column("int", { name: "tipo_convenio_id" })
  tipoConvenioId: number;

  @Column("int", { name: "endereco_id" })
  enderecoId: number;

  @Column("varchar", { name: "cpf", nullable: true, length: 14 })
  cpf: string | null;

  @Column("varchar", { name: "rg", nullable: true, length: 13 })
  rg: string | null;

  @Column("varchar", { name: "orgao_emissor", nullable: true, length: 20 })
  orgaoEmissor: string | null;

  @Column("date", { name: "data_emissao", nullable: true })
  dataEmissao: string | null;

  @Column("varchar", { name: "telefone_fixo", nullable: true, length: 14 })
  telefoneFixo: string | null;

  @Column("varchar", { name: "telefone_trabalho", nullable: true, length: 14 })
  telefoneTrabalho: string | null;

  @Column("varchar", { name: "celular", nullable: true, length: 16 })
  celular: string | null;

  @Column("varchar", { name: "sexo", nullable: true, length: 2 })
  sexo: string | null;

  @Column("date", { name: "data_nascimento", nullable: true })
  dataNascimento: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 50 })
  email: string | null;

  @Column("varchar", { name: "estado_civil", nullable: true, length: 1 })
  estadoCivil: string | null;

  @Column("varchar", { name: "escolaridade", nullable: true, length: 20 })
  escolaridade: string | null;

  @Column("varchar", { name: "profissao", nullable: true, length: 100 })
  profissao: string | null;

  @Column("varchar", { name: "recomendacao", nullable: true, length: 30 })
  recomendacao: string | null;

  @Column("varchar", { name: "naturalidade", nullable: true, length: 100 })
  naturalidade: string | null;

  @Column("varchar", { name: "nacionalidade", nullable: true, length: 1 })
  nacionalidade: string | null;

  @Column("varchar", { name: "situacao", nullable: true, length: 2 })
  situacao: string | null;

  @Column("varchar", { name: "carteira_convenio", nullable: true, length: 50 })
  carteiraConvenio: string | null;

  @Column("date", { name: "validade", nullable: true })
  validade: string | null;

  @OneToMany(() => Agenda, (agenda) => agenda.paciente)
  agenda: Agenda[];

  @OneToMany(() => Exame, (exame) => exame.paciente)
  exames: Exame[];

  @ManyToOne(() => Endereco, (endereco) => endereco.pacientes, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
    cascade: true
  })
  @JoinColumn([{ name: "endereco_id", referencedColumnName: "id" }])
  endereco: Endereco;

  @ManyToOne(() => TipoConvenio, (tipoConvenio) => tipoConvenio.pacientes, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "tipo_convenio_id", referencedColumnName: "id" }])
  tipoConvenio: TipoConvenio;

  @OneToMany(
    () => RegistroClinico,
    (registroClinico) => registroClinico.paciente
  )
  registroClinicos: RegistroClinico[];

  @OneToMany(() => Relatorio, (relatorio) => relatorio.paciente2)
  relatorios: Relatorio[];
}
