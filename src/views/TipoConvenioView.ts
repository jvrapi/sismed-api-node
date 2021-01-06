import { TipoConvenio } from '../models/TipoConvenio';

export default {
  tipoConvenio(tipoConvenio: TipoConvenio) {
    return {
      id: tipoConvenio.id,
      nome: tipoConvenio.nome,
      convenio: {
        id: tipoConvenio.convenio.id,
      }
    }
  }
}