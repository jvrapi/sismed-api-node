
import { Agenda } from '../models/Agenda'
export default {
  detalhes(agendamento: Agenda) {
    return {
      id: agendamento.id,
      data: agendamento.data,
      hora: agendamento.hora,
      compareceu: agendamento.compareceu,
      pagou: agendamento.pagou,
      primeiraVez: agendamento.primeiraVez,
      observacao: agendamento.observacao,
      paciente: {
        prontuario: agendamento.paciente.prontuario,
        nome: agendamento.paciente.nome,
        cpf: agendamento.paciente.cpf,
        rg: agendamento.paciente.rg,
        dataNascimento: agendamento.paciente.dataNascimento,
        tipoConvenio: {
          id: agendamento.paciente.tipoConvenio.id,
          nome: agendamento.paciente.tipoConvenio.nome,
          convenio: {
            id: agendamento.paciente.tipoConvenio.convenio.id,
            nome: agendamento.paciente.tipoConvenio.convenio.nome
          }
        }
      },
      funcionario: {
        id: agendamento.funcionario.id,
        crm: agendamento.funcionario.crm,
        especialidade: agendamento.funcionario.especialidade,
      },
      tipoConvenio: {
        id: agendamento.tipoConvenio.id,
        nome: agendamento.tipoConvenio.nome,
        convenio: {
          id: agendamento.tipoConvenio.convenio.id,
          nome: agendamento.tipoConvenio.convenio.nome
        }
      },
      procedimento: {
        id: agendamento.procedimento.id,
        nome: agendamento.procedimento.descricao,
        valor: agendamento.procedimento.valor,
        convenio: {
          id: agendamento.procedimento.convenio.id,
          nome: agendamento.procedimento.convenio.nome
        }
      }
    }
  },
  lista(agendamentos: Agenda[]) {
    return agendamentos.map(agendamento => {
      return {
        id: agendamento.id,
        data: agendamento.data,
        hora: agendamento.hora,
        compareceu: agendamento.compareceu,
        pagou: agendamento.pagou,
        primeiraVez: agendamento.primeiraVez,
        observacao: agendamento.observacao,
        finalizado: agendamento.finalizado,
        paciente: {
          prontuario: agendamento.paciente.prontuario,
          nome: agendamento.paciente.nome,
          telefoneFixo: agendamento.paciente.telefoneFixo,
          celular: agendamento.paciente.celular,
          dataNascimento: agendamento.paciente.dataNascimento,
          idade: CalcularIdade(agendamento.paciente.dataNascimento)
        },
        funcionario: {
          id: agendamento.funcionario.id,
          nome: agendamento.funcionario.nome,
        },
        tipoConvenio: {
          id: agendamento.tipoConvenio.id,
          nome: agendamento.tipoConvenio.nome,
          convenio: {
            id: agendamento.tipoConvenio.convenio.id,
            nome: agendamento.tipoConvenio.convenio.nome
          }
        },

      }
    })
  }
}

const CalcularIdade = (dataNascimento: string | null) => {

  let resposta = 'Data nascimento não cadastrada';

  if (dataNascimento) {
    const todayDate = new Date();
    const todayArray = todayDate.toLocaleDateString().split('/');
    const nascimentoArray = dataNascimento.split('-');

    // Informações sobre a data atual
    const todayYear = Number(todayArray[2]);
    const todayMonth = Number(todayArray[1]);
    const todayDay = Number(todayArray[0]);

    // Informações da data de nascimento do paciente
    const yearNascimento = Number(nascimentoArray[0]);
    const monthNascimento = Number(nascimentoArray[1]);
    const dayNascimento = Number(nascimentoArray[2]);

    let idade = todayYear - yearNascimento;

    /*Caso o mes atual seja menor que o mes do nascimento
      aniversario ainda não passou
    */
    if (todayMonth < monthNascimento) {
      idade--;
    }
    // Esta no mes do aniversario
    else if (todayMonth === monthNascimento) {
      /*Caso o dia atual seja menor que o dia do nascimento
        aniversario ainda não passou
      */
      if (todayDay < dayNascimento) {
        idade--;
      }
    }
    resposta = `${idade} Anos`
  }


  return resposta;
}

