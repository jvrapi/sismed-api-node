import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DadosBancarios } from "./DadosBancarios";
import { Procedimento } from "./Procedimento";
import { Relatorio } from "./Relatorio";
import { TipoConvenio } from "./TipoConvenio";

@Index("fk_sismed_convenio_sismed_dados_bancarios1_idx", ["dadosBancarios"], {})
@Entity("convenio", { schema: "macmassc_sismed" })
export class Convenio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nome", length: 45 })
  nome: string;

  @Column("date", { name: "data_adesao" })
  dataAdesao: string;

  @Column("varchar", { name: "cnpj", nullable: true, length: 14 })
  cnpj: string | null;

  @Column("varchar", { name: "registro_ans", nullable: true, length: 6 })
  registroAns: string | null;

  @Column("int", { name: "dados_bancarios" })
  dadosBancarios: number;

  @ManyToOne(
    () => DadosBancarios,
    (dadosBancarios) => dadosBancarios.convenios,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "dados_bancarios", referencedColumnName: "id" }])
  dadosBancarios2: DadosBancarios;

  @OneToMany(() => Procedimento, (procedimento) => procedimento.convenio)
  procedimentos: Procedimento[];

  @OneToMany(() => Relatorio, (relatorio) => relatorio.convenio2)
  relatorios: Relatorio[];

  @OneToMany(() => TipoConvenio, (tipoConvenio) => tipoConvenio.convenio)
  tipoConvenios: TipoConvenio[];
}
