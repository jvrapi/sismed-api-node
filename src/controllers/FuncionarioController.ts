import { Request, Response } from 'express';
import { getRepository, IsNull, Not, Like } from 'typeorm';
import Funcionario from '../models/SismedFuncionario';
import Convenio from '../models/SismedConvenio';
import TipoConvenio from '../models/SismedTipoConvenio';
import FuncionarioTipoConvenio from '../models/SismedFuncionarioTconvenio';

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
    const funcionario = await repository.findOne({ id: parseInt(id) });
    if (funcionario)
      return response.json(FuncionarioView.funcionario(funcionario));

  },

  async medicos(request: Request, response: Response) {
    const repository = getRepository(Funcionario);
    const medicos = await repository.find({ crm: Not(IsNull()) });
    return response.json(FuncionarioView.medicos(medicos));
  },

  async conveniosAceitos(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Convenio);
    let convenios = await repository.createQueryBuilder('c')
      .select(['c.id as id', 'c.nome as nome'])
      .distinct(true)
      .innerJoin(TipoConvenio, 'tc', 'tc.convenioId = c.id')
      .innerJoin(FuncionarioTipoConvenio, 'ft', 'ft.tipoConvenioId = tc.id')
      .innerJoin(Funcionario, 'f', 'ft.funcionarioId = f.id')
      .where(`f.id = ${id} AND c.id <> 14`)
      .getRawMany();
    return response.json(convenios);
  },

  async tiposConvenioAceitos(request: Request, response: Response) {
    const { funcionarioId, convenioId } = request.params;
    const repository = getRepository(TipoConvenio);
    const tiposConvenio = await repository.createQueryBuilder('tc')
      .select(['tc.id as id', 'tc.nome as nome'])
      .innerJoin(FuncionarioTipoConvenio, 'ft', 'ft.tipoConvenioId = tc.id')
      .innerJoin(Funcionario, 'f', 'ft.funcionarioId = f.id')
      .where(`f.id = ${funcionarioId} AND tc.convenio_id = ${convenioId}`)
      .getRawMany();
    return response.json(tiposConvenio);
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

};
