import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Funcionario } from "./Funcionario";
import { TipoConvenio } from "./TipoConvenio";

@Index(
  "fk_sismed_funcionario_has_sismed_tipo_convenio_sismed_tipo__idx",
  ["tipoConvenioId"],
  {}
)
@Index(
  "fk_sismed_funcionario_has_sismed_tipo_convenio_sismed_funci_idx",
  ["funcionarioId"],
  {}
)
@Entity("funcionario_tconvenio", { schema: "macmassc_sismed" })
export class FuncionarioTconvenio {
  @Column("int", { primary: true, name: "id", default: () => "'0'" })
  id: number;

  @Column("int", { name: "funcionario_id" })
  funcionarioId: number;

  @Column("int", { name: "tipo_convenio_id" })
  tipoConvenioId: number;

  @ManyToOne(
    () => Funcionario,
    (funcionario) => funcionario.funcionarioTconvenios,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "funcionario_id", referencedColumnName: "id" }])
  funcionario: Funcionario;

  @ManyToOne(
    () => TipoConvenio,
    (tipoConvenio) => tipoConvenio.funcionarioTconvenios,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "tipo_convenio_id", referencedColumnName: "id" }])
  tipoConvenio: TipoConvenio;
}
