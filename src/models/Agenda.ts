import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Funcionario } from "./Funcionario";
import { Procedimento } from "./Procedimento";
import { TipoConvenio } from "./TipoConvenio";
import { Paciente } from "./Paciente";
import { RegistroClinico } from "./RegistroClinico";
import { Relatorio } from "./Relatorio";

@Index("fk_agenda_funcionario_id", ["funcionarioId"], {})
@Index("fk_agenda_procedimento_id", ["procedimentoId"], {})
@Index("fk_agenda_tconvenio_id", ["tipoConvenioId"], {})
@Index("fk_sismed_agenda_sismed_paciente1_idx", ["pacienteId"], {})
@Entity("agenda", { schema: "macmassc_sismed" })
export class Agenda {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "observacao", nullable: true, length: 255 })
  observacao: string | null;

  @Column("tinyint", { name: "primeira_vez", width: 1, default: () => "'1'" })
  primeiraVez: boolean;

  @Column("tinyint", { name: "compareceu", width: 1, default: () => "'1'" })
  compareceu: boolean;

  @Column("tinyint", { name: "pagou", width: 1, default: () => "'1'" })
  pagou: boolean;

  @Column("date", { name: "data" })
  data: string;

  @Column("time", { name: "hora" })
  hora: string;

  @Column("int", { name: "procedimento_id" })
  procedimentoId: number;

  @Column("int", { name: "tipo_convenio_id" })
  tipoConvenioId: number;

  @Column("int", { name: "funcionario_id" })
  funcionarioId: number;

  @Column("int", { name: "paciente_id" })
  pacienteId: number;

  @Column("int", { name: "finalizado", nullable: true, default: () => "'0'" })
  finalizado: number | null;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.agenda, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "funcionario_id", referencedColumnName: "id" }])
  funcionario: Funcionario;

  @ManyToOne(() => Procedimento, (procedimento) => procedimento.agenda, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "procedimento_id", referencedColumnName: "id" }])
  procedimento: Procedimento;

  @ManyToOne(() => TipoConvenio, (tipoConvenio) => tipoConvenio.agenda, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "tipo_convenio_id", referencedColumnName: "id" }])
  tipoConvenio: TipoConvenio;

  @ManyToOne(() => Paciente, (paciente) => paciente.agenda, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "paciente_id", referencedColumnName: "prontuario" }])
  paciente: Paciente;

  @OneToMany(
    () => RegistroClinico,
    (registroClinico) => registroClinico.agendamento
  )
  registroClinicos: RegistroClinico[];

  @OneToMany(() => Relatorio, (relatorio) => relatorio.agendamento2)
  relatorios: Relatorio[];
}
