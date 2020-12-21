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
          prontuario: registro.paciente.prontuario,
          nome: registro.paciente.nome
        }
      }
    })
  },
  detalhes(registro: RegistroClinico) {
    return {
      id: registro.id,
      data: registro.data,
      hora: registro.hora,
      descricao: registro.descricao,
      agendamento: registro.agendamento ? registro.agendamento.id : null,
      funcionario: {
        id: registro.funcionario.id,
      },
      paciente: {
        prontuario: registro.paciente.prontuario,
        nome: registro.paciente.nome,
        tipoConvenio: {
          id: registro.paciente.tipoConvenio.id,
          nome: registro.paciente.tipoConvenio.nome,
          convenio: {
            id: registro.paciente.tipoConvenio.convenio.id,
            nome: registro.paciente.tipoConvenio.convenio.nome
          }
        }
      }
    }
  }
}