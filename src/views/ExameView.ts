import { Exame } from '../models/Exame';

interface ExamePesquisa {
  id: number,
  nome: string,
  data_coleta: string,
  data_envio: string,
  data_retorno: string,
  pacienteNome: string

}

export default {
  listar(exames: Exame[]) {
    return exames.map(exame => {
      return {
        id: exame.id,
        nome: exame.nome,
        dataColeta: exame.dataColeta,
        dataEnvio: exame.dataEnvio,
        dataRetorno: exame.dataRetorno,
        paciente: {
          nome: exame.paciente.nome,
        }
      }
    })
  },

  pesquisa(pesquisaExames: ExamePesquisa[]) {
    return pesquisaExames.map(exame => {
      return {
        id: exame.id,
        nome: exame.nome,
        dataColeta: exame.data_coleta,
        dataEnvio: exame.data_envio,
        dataRetorno: exame.data_retorno,
        paciente: {
          nome: exame.pacienteNome
        }
      }
    })

  },

  detalhes(exame: Exame) {
    return {
      id: exame.id,
      nome: exame.nome,
      descricao: exame.descricao,
      funcionarioLaboratorio: exame.funcionarioLaboratorio,
      dataColeta: exame.dataColeta,
      dataEnvio: exame.dataEnvio,
      dataRetorno: exame.dataRetorno,
      valor: exame.valor,
      paciente: {
        prontuario: exame.paciente.prontuario,
        nome: exame.paciente.nome,
        cpf: exame.paciente.cpf,
        rg: exame.paciente.rg,
        dataNascimento: exame.paciente.dataNascimento,
        tipoConvenio: {
          id: exame.paciente.tipoConvenio.id,
          nome: exame.paciente.tipoConvenio.nome,
          convenio: {
            nome: exame.paciente.tipoConvenio.convenio.nome
          }
        }
      },
      laboratorio: {
        id: exame.laboratorio.id,
        nome: exame.laboratorio.nome,
        telefoneFixo: exame.laboratorio.telefoneFixo,
        email: exame.laboratorio.email,
      },
      funcionario: {
        id: exame.funcionario.id,
      },
      tipoConvenio: {
        id: exame.tipoConvenio.id,
      }

    }
  }
}