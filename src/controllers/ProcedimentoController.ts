import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import { Procedimento } from '../models/Procedimento';
import ProcedimentoView from '../views/ProcedimentoView';

export default {
  async listPorConvenio(request: Request, response: Response) {
    const { convenioId } = request.params;
    const repository = getRepository(Procedimento);
    const procedimentos = await repository.find({ where: { convenioId } });
    return response.json(procedimentos);
  },

  async listPorDescricao(request: Request, response: Response) {
    const { descricao, convenioId } = request.params;

    const repository = getRepository(Procedimento);
    const procedimentos = await repository.find(
      {
        where: { descricao: Like(`%${descricao}%`), convenioId },
        relations: ['convenio']
      }
    );

    return response.json(procedimentos)
  },


  async listarPorId(request: Request, response: Response) {
    const { id } = request.params;

    const repository = getRepository(Procedimento);
    const procedimento = await repository.findOne(
      {
        where: { id },
        relations: ['convenio']
      }
    );

    if (procedimento) {
      return response.json(ProcedimentoView.procedimento(procedimento));

    } else {
      return response.sendStatus(404)
    }
  },

  async cadastrar(request: Request, response: Response) {
    const { descricao, valor, convenioId } = request.body;
    const dados = { descricao, valor, convenioId };
    const repository = getRepository(Procedimento);
    const procedimento = repository.create(dados);
    await repository.save(procedimento);
    return response.status(201).json(procedimento);
  },

  async atualizar(request: Request, response: Response) {
    const { id, descricao, valor, convenioId } = request.body;
    const dados = { id, descricao, valor, convenioId };
    const repository = getRepository(Procedimento);
    const procedimento = await repository.save(dados);
    return response.json(procedimento);
  },
  async excluir(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Procedimento);
    try {
      await repository.delete(id);
      return response.status(200).json([]);
    } catch {
      return response.sendStatus(500).json({ messagem: 'Não foi possivel excluir o procedimento' })
    }
  },
};
