import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Funcionario } from "./Funcionario";
import { Laboratorio } from "./Laboratorio";
import { Paciente } from "./Paciente";
import { TipoConvenio } from "./TipoConvenio";

@Index("fk_sismed_exame_sismed_funcionario1_idx", ["funcionarioId"], {})
@Index("fk_sismed_exame_sismed_laboratorio1_idx", ["laboratorioId"], {})
@Index("fk_sismed_exame_sismed_convenio", ["tipoConvenioId"], {})
@Index("fk_exame_paciente", ["pacienteId"], {})
@Entity("exame", { schema: "macmassc_sismed" })
export class Exame {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nome", length: 50 })
  nome: string;

  @Column("varchar", { name: "descricao", length: 250 })
  descricao: string;

  @Column("date", { name: "data_coleta" })
  dataColeta: string;

  @Column("date", { name: "data_envio" })
  dataEnvio: string;

  @Column("date", { name: "data_retorno", nullable: true })
  dataRetorno: string | null;

  @Column("varchar", { name: "funcionario_laboratorio", length: 45 })
  funcionarioLaboratorio: string;

  @Column("decimal", {
    name: "valor",
    precision: 7,
    scale: 2,
    default: () => "'0.00'",
  })
  valor: string;

  @Column("int", { name: "tipo_convenio_id" })
  tipoConvenioId: number;

  @Column("int", { name: "paciente_id" })
  pacienteId: number;

  @Column("int", { name: "funcionario_id" })
  funcionarioId: number;

  @Column("int", { name: "laboratorio_id" })
  laboratorioId: number;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.exames, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "funcionario_id", referencedColumnName: "id" }])
  funcionario: Funcionario;

  @ManyToOne(() => Laboratorio, (laboratorio) => laboratorio.exames, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "laboratorio_id", referencedColumnName: "id" }])
  laboratorio: Laboratorio;

  @ManyToOne(() => Paciente, (paciente) => paciente.exames, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "paciente_id", referencedColumnName: "prontuario" }])
  paciente: Paciente;

  @ManyToOne(() => TipoConvenio, (tipoConvenio) => tipoConvenio.exames, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "tipo_convenio_id", referencedColumnName: "id" }])
  tipoConvenio: TipoConvenio;
}
