import { Procedimento } from '../models/Procedimento';

export default {
  procedimento(procedimento: Procedimento) {
    return {
      id: procedimento.id,
      descricao: procedimento.descricao,
      valor: procedimento.valor,
      convenio: {
        id: procedimento.convenio.id,
        nome: procedimento.convenio.nome
      }
    }
  },
  procedimentos(procedimentos: Procedimento[]) {
    return procedimentos.map(procedimento => this.procedimento(procedimento))
  }
}