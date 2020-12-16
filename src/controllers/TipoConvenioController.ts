import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import TipoConvenio from '../models/SismedTipoConvenio';

export default {
  async listarPorConvenio(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(TipoConvenio);
    const tiposConvenios = await repository.find({ where: { convenioId: id } });
    return response.json(tiposConvenios)
  }
}