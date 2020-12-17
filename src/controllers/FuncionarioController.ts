import { Request, Response } from 'express';
import { getRepository, IsNull, Not, Like } from 'typeorm';
import Funcionario from '../models/SismedFuncionario';


import FuncionarioView from '../views/FuncionarioView';

export default {
  async listarTodos(request: Request, response: Response) {
    const repository = getRepository(Funcionario);
    const funcionarios = await repository.find();
    return response.json(FuncionarioView.funcionarios(funcionarios));
  },

  async listarPorId(request: Request, response: Response) {

    const { id } = request.params;
    const repository = getRepository(Funcionario);
    const funcionario = await repository.findOne(
      {
        where: { id },
        relations: ['endereco']
      }
    );
    if (funcionario) {

      return response.json(FuncionarioView.funcionario(funcionario));

    } else {
      return response.sendStatus(404);
    }
  },

  async medicos(request: Request, response: Response) {

    const repository = getRepository(Funcionario);
    const medicos = await repository.find({ crm: Not(IsNull()) });
    return response.json(FuncionarioView.medicos(medicos));
  },


  async listarPorNome(request: Request, response: Response) {
    const { nome } = request.params;
    const repository = getRepository(Funcionario);
    const funcionarios = await repository.find({ where: { nome: Like(`%${nome}%`) } });
    response.json(FuncionarioView.funcionarios(funcionarios))
  },

  async listarPorCpf(request: Request, response: Response) {
    const { cpf } = request.params;
    const repository = getRepository(Funcionario);
    const funcionarios = await repository.find({ where: { cpf: Like(`%${cpf}%`) } });
    response.json(FuncionarioView.funcionarios(funcionarios))
  },

  async listarPorCrm(request: Request, response: Response) {
    const { crm } = request.params;
    const repository = getRepository(Funcionario);
    const funcionarios = await repository.find({ where: { crm: Like(`%${crm}%`) } });
    response.json(FuncionarioView.funcionarios(funcionarios))
  },

  async listarPorCelular(request: Request, response: Response) {
    const { celular } = request.params;
    const repository = getRepository(Funcionario);
    const funcionarios = await repository.find({ where: { celular: Like(`%${celular}%`) } });
    response.json(FuncionarioView.funcionarios(funcionarios))
  },

  async listarPorMatricula(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Funcionario);
    const funcionarios = await repository.find({ where: { id } });
    response.json(FuncionarioView.funcionarios(funcionarios))
  },

  async listarPorEspecialidade(request: Request, response: Response) {
    const { especialidade } = request.params;
    const repository = getRepository(Funcionario);
    const funcionarios = await repository.find({ where: { especialidade: Like(`%${especialidade}%`) } });
    response.json(FuncionarioView.funcionarios(funcionarios))
  },

  async atualizar(request: Request, response: Response) {
    const {
      id,
      nome,
      dataNascimento,
      cpf,
      rg,
      orgaoEmissor,
      dataEmissao,
      dataInicio,
      dataTermino,
      naturalidade,
      nacionalidade,
      telefoneFixo,
      telefoneTrabalho,
      celular,
      email,
      sexo,
      estadoCivil,
      escolaridade,
      crm,
      especialidade,
      recomendacao,
      tipoConvenio,
      carteiraConvenio,
      validade,
      situacao,
      perfilId,
      endereco
    } = request.body;
    const repository = getRepository(Funcionario);
    const dados = {
      id,
      nome,
      dataNascimento,
      cpf,
      rg,
      orgaoEmissor,
      dataEmissao,
      dataInicio,
      dataTermino,
      naturalidade,
      nacionalidade,
      telefoneFixo,
      telefoneTrabalho,
      celular,
      email,
      sexo,
      estadoCivil,
      escolaridade,
      crm,
      especialidade,
      recomendacao,
      tipoConvenio,
      carteiraConvenio,
      validade,
      situacao,
      perfilId,
      endereco
    }
    const funcionario = await repository.save(dados);
    return response.json(funcionario);
  },

  async excluir(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Funcionario);
    try {
      await repository.delete(id);
      return response.status(200).json([]);
    } catch {
      return response.sendStatus(500).json({ messagem: 'Erro ao tentar excluir o funcionário' })
    }
  }

};
