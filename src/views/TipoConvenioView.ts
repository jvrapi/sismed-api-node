import TipoConvenio from '../models/SismedTipoConvenio';

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