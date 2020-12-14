import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Procedimento from '../models/SismedProcedimento';

export default {
  async listPorConvenio(request: Request, response: Response) {
    const { convenioId } = request.params;
    const repository = getRepository(Procedimento);
    const procedimentos = await repository.find({ convenioId: parseInt(convenioId) });
    return response.json(procedimentos);
  },
};
