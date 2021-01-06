import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Convenio } from "./Convenio";

@Entity("dados_bancarios", { schema: "macmassc_sismed" })
export class DadosBancarios {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "banco", length: 45 })
  banco: string;

  @Column("varchar", { name: "agencia", length: 45 })
  agencia: string;

  @Column("varchar", { name: "conta", length: 45 })
  conta: string;

  @OneToMany(() => Convenio, (convenio) => convenio.dadosBancarios2)
  convenios: Convenio[];
}
