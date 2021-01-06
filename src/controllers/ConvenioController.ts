import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import { Convenio } from '../models/Convenio';

export default {
  async listarTodos(request: Request, response: Response) {
    const repository = getRepository(Convenio);
    const convenios = await repository.find({ order: { nome: 'ASC' } });
    return response.json(convenios)
  },

  async listarPorId(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Convenio);
    const convenio = await repository.findOne(
      {
        where: { id },
        relations: ['dadosBancarios']
      }
    );
    return response.json(convenio);
  },

  async listarPorNome(request: Request, response: Response) {
    const { nome } = request.params;
    const repository = getRepository(Convenio);
    const convenios = await repository.find(
      {
        where: { nome: Like(`%${nome}%`) },
        order: { nome: 'ASC' }
      }
    );
    return response.json(convenios);
  },

  async listarPorAns(request: Request, response: Response) {
    const { ans } = request.params;
    const repository = getRepository(Convenio);
    const convenios = await repository.find(
      {
        where: { ans: Like(`%${ans}%`) },
        order: { nome: 'ASC' }
      }
    );
    return response.json(convenios);
  },

  async listarPorCnpj(request: Request, response: Response) {
    const { cnpj } = request.params;
    const repository = getRepository(Convenio);
    const convenios = await repository.find(
      {
        where: { cnpj: Like(`%${cnpj}%`) },
        order: { nome: 'ASC' }
      }
    );
    return response.json(convenios);
  },

  async cadastrar(request: Request, response: Response) {
    const {
      nome,
      cnpj,
      ans,
      dataAdesao,
      dadosBancarios
    } = request.body;
    const dados = {
      nome,
      cnpj,
      ans,
      dataAdesao,
      dadosBancarios
    }
    const repository = getRepository(Convenio);
    const convenio = repository.create(dados);
    await repository.save(convenio);
    return response.status(201).json(convenio);
  },

  async atualizar(request: Request, response: Response) {
    const {
      id,
      nome,
      cnpj,
      registroAns,
      dataAdesao,
      dadosBancarios
    } = request.body;
    const dados = {
      id,
      nome,
      cnpj,
      registroAns,
      dataAdesao,
      dadosBancarios
    }
    const repository = getRepository(Convenio);
    const convenio = await repository.save(dados);
    return response.json(convenio);
  },

  async excluir(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Convenio);
    try {
      await repository.delete(id);
      return response.status(200).json([]);
    } catch {
      return response.sendStatus(500).json({ messagem: 'Erro ao tentar excluir o convenio' })
    }
  },
}