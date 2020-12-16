import Paciente from '../models/SismedPaciente';

export default {
  listar(pacientes: Paciente[]) {
    return pacientes.map(paciente => {
      return {
        prontuario: paciente.prontuario,
        nome: paciente.nome,
        cpf: paciente.cpf,
        rg: paciente.rg,
        telefoneFixo: paciente.telefoneFixo,
        celular: paciente.celular,
        tipoConvenio: {
          id: paciente.tipoConvenio.id,
          nome: paciente.tipoConvenio.nome,
          convenio: {
            id: paciente.tipoConvenio.convenio.id,
            nome: paciente.tipoConvenio.convenio.nome
          }
        },
      }
    })
  }
}