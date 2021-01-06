import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Agenda } from "./Agenda";
import { Convenio } from "./Convenio";
import { Funcionario } from "./Funcionario";
import { Paciente } from "./Paciente";
import { Procedimento } from "./Procedimento";

@Index("fk_sismed_custos_sismed_agenda1_idx", ["agendamento"], {})
@Index("fk_paciente", ["paciente"], {})
@Index("fk_convenio", ["convenio"], {})
@Index("fk_procedimento", ["procedimento"], {})
@Index("fk_medico", ["funcionario"], {})
@Entity("relatorio", { schema: "macmassc_sismed" })
export class Relatorio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "paciente" })
  paciente: number;

  @Column("int", { name: "convenio" })
  convenio: number;

  @Column("int", { name: "procedimento" })
  procedimento: number;

  @Column("decimal", { name: "valor", precision: 7, scale: 2 })
  valor: string;

  @Column("date", { name: "data" })
  data: string;

  @Column("time", { name: "hora" })
  hora: string;

  @Column("int", { name: "funcionario" })
  funcionario: number;

  @Column("int", { name: "agendamento" })
  agendamento: number;

  @ManyToOne(() => Agenda, (agenda) => agenda.relatorios, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "agendamento", referencedColumnName: "id" }])
  agendamento2: Agenda;

  @ManyToOne(() => Convenio, (convenio) => convenio.relatorios, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "convenio", referencedColumnName: "id" }])
  convenio2: Convenio;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.relatorios, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "funcionario", referencedColumnName: "id" }])
  funcionario2: Funcionario;

  @ManyToOne(() => Paciente, (paciente) => paciente.relatorios, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "paciente", referencedColumnName: "prontuario" }])
  paciente2: Paciente;

  @ManyToOne(() => Procedimento, (procedimento) => procedimento.relatorios, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "procedimento", referencedColumnName: "id" }])
  procedimento2: Procedimento;
}
