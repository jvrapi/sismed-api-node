import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Laboratorio } from "./Laboratorio";
import { TipoConvenio } from "./TipoConvenio";

@Index(
  "fk_sismed_tipo_convenio_has_sismed_laboratorio_sismed_labor_idx",
  ["laboratorioId"],
  {}
)
@Index(
  "fk_sismed_tipo_convenio_has_sismed_laboratorio_sismed_tipo__idx",
  ["tipoConvenioId"],
  {}
)
@Entity("laboratorio_tconvenio", { schema: "macmassc_sismed" })
export class LaboratorioTconvenio {
  @Column("int", { primary: true, name: "id", default: () => "'0'" })
  id: number;

  @Column("int", { name: "tipo_convenio_id" })
  tipoConvenioId: number;

  @Column("int", { name: "laboratorio_id" })
  laboratorioId: number;

  @ManyToOne(
    () => Laboratorio,
    (laboratorio) => laboratorio.laboratorioTconvenios,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "laboratorio_id", referencedColumnName: "id" }])
  laboratorio: Laboratorio;

  @ManyToOne(
    () => TipoConvenio,
    (tipoConvenio) => tipoConvenio.laboratorioTconvenios,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "tipo_convenio_id", referencedColumnName: "id" }])
  tipoConvenio: TipoConvenio;
}
