import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exame } from "./Exame";
import { Endereco } from "./Endereco";
import { LaboratorioTconvenio } from "./LaboratorioTconvenio";

@Index("cnpj", ["cnpj"], { unique: true })
@Index("fk_endereco", ["enderecoId"], {})
@Entity("laboratorio", { schema: "macmassc_sismed" })
export class Laboratorio {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "cnpj", unique: true, length: 14 })
  cnpj: string;

  @Column("varchar", { name: "nome", length: 45 })
  nome: string;

  @Column("varchar", { name: "responsavel", length: 45 })
  responsavel: string;

  @Column("varchar", { name: "telefone_fixo", length: 10 })
  telefoneFixo: string;

  @Column("varchar", { name: "email", nullable: true, length: 45 })
  email: string | null;

  @Column("int", { name: "endereco_id" })
  enderecoId: number;

  @OneToMany(() => Exame, (exame) => exame.laboratorio)
  exames: Exame[];

  @ManyToOne(() => Endereco, (endereco) => endereco.laboratorios, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "endereco_id", referencedColumnName: "id" }])
  endereco: Endereco;

  @OneToMany(
    () => LaboratorioTconvenio,
    (laboratorioTconvenio) => laboratorioTconvenio.laboratorio
  )
  laboratorioTconvenios: LaboratorioTconvenio[];
}
