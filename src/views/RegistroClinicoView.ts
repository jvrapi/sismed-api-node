import RegistroClinico from '../models/SismedRegistroClinico';

export default {
  listar(registrosClinico: RegistroClinico[]) {
    return registrosClinico.map(registro => {
      return {
        id: registro.id,
        data: registro.data,
        hora: registro.hora,
        descricao: registro.descricao,
        funcionario: {
          id: registro.funcionario.id,
          nome: registro.funcionario.nome
        },
        paciente: {
          id: registro.paciente.prontuario,
          nome: registro.paciente.nome
        }
      }
    })
  }
}