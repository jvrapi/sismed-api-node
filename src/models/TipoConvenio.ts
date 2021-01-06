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
import { FuncionarioTconvenio } from "./FuncionarioTconvenio";
import { LaboratorioTconvenio } from "./LaboratorioTconvenio";
import { Paciente } from "./Paciente";
import { Convenio } from "./Convenio";

@Index("fk_tipo_convenio_convenio1_idx", ["convenioId"], {})
@Entity("tipo_convenio", { schema: "macmassc_sismed" })
export class TipoConvenio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "convenio_id" })
  convenioId: number;

  @Column("varchar", { name: "nome", length: 45 })
  nome: string;

  @OneToMany(() => Agenda, (agenda) => agenda.tipoConvenio)
  agenda: Agenda[];

  @OneToMany(() => Exame, (exame) => exame.tipoConvenio)
  exames: Exame[];

  @OneToMany(
    () => FuncionarioTconvenio,
    (funcionarioTconvenio) => funcionarioTconvenio.tipoConvenio
  )
  funcionarioTconvenios: FuncionarioTconvenio[];

  @OneToMany(
    () => LaboratorioTconvenio,
    (laboratorioTconvenio) => laboratorioTconvenio.tipoConvenio
  )
  laboratorioTconvenios: LaboratorioTconvenio[];

  @OneToMany(() => Paciente, (paciente) => paciente.tipoConvenio)
  pacientes: Paciente[];

  @ManyToOne(() => Convenio, (convenio) => convenio.tipoConvenios, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "convenio_id", referencedColumnName: "id" }])
  convenio: Convenio;
}
