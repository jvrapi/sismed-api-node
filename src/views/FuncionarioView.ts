import Funcionario from '../models/SismedFuncionario';

export default {
  autenticacao(funcionario: Funcionario, token: string) {
    return {
      id: funcionario.id,
      perfil: funcionario.perfilId,
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      token,
    };
  },

  funcionario(funcionario: Funcionario) {
    return {
      id: funcionario.id,
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      rg: funcionario.rg,
      orgaoEmissor: funcionario.orgaoEmissor,
      dataEmissao: funcionario.dataEmissao,
      crm: funcionario.crm,
      especialidade: funcionario.especialidade,
      telefoneFixo: funcionario.telefoneFixo,
      celular: funcionario.celular,
      sexo: funcionario.sexo,
      dataNascimento: funcionario.dataNascimento,
      email: funcionario.email,
      estadoCivil: funcionario.estadoCivil,
      escolaridade: funcionario.escolaridade,
      naturalidade: funcionario.naturalidade,
      dataInicio: funcionario.dataInicio,
      dataTermino: funcionario.dataTermino,
      nacionalidade: funcionario.nacionalidade,
    };
  },

  funcionarios(funcionario: Funcionario[]) {
    return funcionario.map((func) => this.funcionario(func));
  },

  medicos(medicos: Funcionario[]) {
    return medicos.map((medico) => ({ id: medico.id, nome: medico.nome }));
  },
};
