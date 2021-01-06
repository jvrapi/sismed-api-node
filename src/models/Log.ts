import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Funcionario } from "./Funcionario";

@Index("fk_simed_log_sismed_funcionario", ["funcionarioId"], {})
@Entity("log", { schema: "macmassc_sismed" })
export class Log {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "funcionario_id" })
  funcionarioId: number;

  @Column("date", { name: "data" })
  data: string;

  @Column("time", { name: "hora" })
  hora: string;

  @Column("varchar", { name: "descricao", nullable: true, length: 255 })
  descricao: string | null;

  @Column("varchar", { name: "evento", nullable: true, length: 50 })
  evento: string | null;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.logs, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "funcionario_id", referencedColumnName: "id" }])
  funcionario: Funcionario;
}
