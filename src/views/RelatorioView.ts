
interface Relatorio {
  funcionarioNome: string,
  pacienteNome: string,
  convenioNome: string,
  data: string,
  procedimento: string,
  valor: number;
}


export default {
  relatorios(relatorios: Relatorio[]) {

    let resposta = { dados: {}, total: 0 }

    relatorios.forEach(relatorio => {
      resposta.total += +relatorio.valor
    });

    resposta.dados = relatorios.map(relatorio => {


      return {

        data: relatorio.data,
        valor: relatorio.valor,
        funcionario: {
          nome: relatorio.funcionarioNome
        },
        paciente: {
          nome: relatorio.pacienteNome
        },
        convenio: {
          nome: relatorio.convenioNome
        },
        procedimento: {
          descricao: relatorio.procedimento
        }

      }
    })
    return resposta;
  }
}