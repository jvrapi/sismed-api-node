import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Agenda } from "./Agenda";
import { Funcionario } from "./Funcionario";
import { Paciente } from "./Paciente";

@Index(
  "fk_sismed_registro_clinico_sismed_funcionario1_idx",
  ["funcionarioId"],
  {}
)
@Index("fk_sismed_registro_clinico_sismed_agenda1_idx", ["agendamentoId"], {})
@Index("fk_registro_clinico_paciente", ["pacienteId"], {})
@Entity("registro_clinico", { schema: "macmassc_sismed" })
export class RegistroClinico {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "data" })
  data: string;

  @Column("time", { name: "hora" })
  hora: string;

  @Column("varchar", { name: "descricao", length: 1000 })
  descricao: string;

  @Column("int", { name: "funcionario_id" })
  funcionarioId: number;

  @Column("int", { name: "agendamento_id", nullable: true })
  agendamentoId: number | null;

  @Column("int", { name: "paciente_id" })
  pacienteId: number;

  @ManyToOne(() => Agenda, (agenda) => agenda.registroClinicos, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "agendamento_id", referencedColumnName: "id" }])
  agendamento: Agenda;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.registroClinicos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "funcionario_id", referencedColumnName: "id" }])
  funcionario: Funcionario;

  @ManyToOne(() => Paciente, (paciente) => paciente.registroClinicos, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "paciente_id", referencedColumnName: "prontuario" }])
  paciente: Paciente;
}
