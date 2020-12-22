import Laboratorio from '../models/SismedLaboratorio';

export default {
  listar(laboratorios: Laboratorio[]) {
    return laboratorios.map(laboratorio => {
      return {
        id: laboratorio.id,
        nome: laboratorio.nome,
        responsavel: laboratorio.responsavel,
        telefoneFixo: laboratorio.telefoneFixo,
        endereco: {
          bairro: laboratorio.endereco.bairro,
          cidade: laboratorio.endereco.cidade,
        }
      }
    })
  }
}