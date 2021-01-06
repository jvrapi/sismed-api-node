import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Funcionario } from "./Funcionario";

@Entity("perfil", { schema: "macmassc_sismed" })
export class Perfil {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "descricao", length: 45 })
  descricao: string;

  @OneToMany(() => Funcionario, (funcionario) => funcionario.perfil)
  funcionarios: Funcionario[];
}
