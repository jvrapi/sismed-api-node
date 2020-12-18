import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import TipoConvenio from '../models/SismedTipoConvenio';
import TipoConvenioView from '../views/TipoConvenioView';

export default {
  async listarPorConvenio(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(TipoConvenio);
    const tiposConvenios = await repository.find(
      {
        where: { convenioId: id },
        order: { nome: 'ASC' },
      }
    );
    return response.json(tiposConvenios)
  },

  async listarPorId(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(TipoConvenio);
    const tipoConvenio = await repository.findOne(
      {
        where: { id },
        relations: ['convenio']

      }
    );
    return response.json(TipoConvenioView.tipoConvenio(tipoConvenio));
  },

  async listarPorNome(request: Request, response: Response) {
    const { nome, convenioId } = request.params;
    const repository = getRepository(TipoConvenio);
    const tiposConvenio = await repository.find(
      {
        where:
        {
          nome: Like(`%${nome}%`),
          convenioId
        },
        order: { nome: 'ASC' }
      }
    );
    return response.json(tiposConvenio);
  },

  async cadastrar(request: Request, response: Response) {
    const { nome, convenioId } = request.body;

    const dados = { nome, convenioId };

    const repository = getRepository(TipoConvenio);

    const tipoConvenio = repository.create(dados);

    await repository.save(tipoConvenio);

    return response.status(201).json(tipoConvenio);

  },

  async atualizar(request: Request, response: Response) {
    const { id, nome, convenio } = request.body;

    const dados = { id, nome, convenio };

    const repository = getRepository(TipoConvenio);

    const tipoConvenio = await repository.save(dados);

    return response.status(201).json(tipoConvenio);
  },

  async excluir(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(TipoConvenio);
    try {
      await repository.delete(id);
      return response.status(200).json([]);
    } catch {
      return response.sendStatus(500).json(
        { messagem: 'Erro ao tentar excluir o plano' }
      );
    }
  },
}