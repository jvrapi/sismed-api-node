import { Request, Response } from 'express';
import { getRepository, Not } from 'typeorm';
import Convenio from '../models/SismedConvenio';

export default {
  async listarTodos(request: Request, response: Response) {
    const repository = getRepository(Convenio);
    const convenios = await repository.find();
    return response.json(convenios)
  }
}