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
import { Convenio } from "./Convenio";
import { Relatorio } from "./Relatorio";

@Index("fk_sismed_procedimento_sismed_convenio1_idx", ["convenioId"], {})
@Entity("procedimento", { schema: "macmassc_sismed" })
export class Procedimento {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "descricao", length: 45 })
  descricao: string;

  @Column("decimal", { name: "valor", precision: 7, scale: 2 })
  valor: string;

  @Column("int", { name: "convenio_id" })
  convenioId: number;

  @OneToMany(() => Agenda, (agenda) => agenda.procedimento)
  agenda: Agenda[];

  @ManyToOne(() => Convenio, (convenio) => convenio.procedimentos, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "convenio_id", referencedColumnName: "id" }])
  convenio: Convenio;

  @OneToMany(() => Relatorio, (relatorio) => relatorio.procedimento2)
  relatorios: Relatorio[];
}
