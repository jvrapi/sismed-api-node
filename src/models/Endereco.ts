import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Funcionario } from "./Funcionario";
import { Laboratorio } from "./Laboratorio";
import { Paciente } from "./Paciente";

@Entity("endereco", { schema: "macmassc_sismed" })
export class Endereco {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "cep", nullable: true, length: 10 })
  cep: string | null;

  @Column("varchar", { name: "logradouro", nullable: true, length: 255 })
  logradouro: string | null;

  @Column("smallint", { name: "numero", nullable: true })
  numero: number | null;

  @Column("varchar", { name: "complemento", nullable: true, length: 45 })
  complemento: string | null;

  @Column("varchar", { name: "bairro", nullable: true, length: 45 })
  bairro: string | null;

  @Column("varchar", { name: "cidade", nullable: true, length: 45 })
  cidade: string | null;

  @Column("varchar", { name: "estado", nullable: true, length: 2 })
  estado: string | null;

  @OneToMany(() => Funcionario, (funcionario) => funcionario.endereco)
  funcionarios: Funcionario[];

  @OneToMany(() => Laboratorio, (laboratorio) => laboratorio.endereco)
  laboratorios: Laboratorio[];

  @OneToMany(() => Paciente, (paciente) => paciente.endereco)
  pacientes: Paciente[];
}
