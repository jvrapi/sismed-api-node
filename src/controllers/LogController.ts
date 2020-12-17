import { Request, Response } from 'express';
import Log from '../models/SismedLog';
import { getRepository } from 'typeorm'

export default {
  async salvar(request: Request, response: Response) {
    const {
      data,
      hora,
      funcionarioId,
      evento,
      descricao
    } = request.body;

    const dados = {
      data,
      hora,
      funcionarioId,
      evento,
      descricao
    }

    const repository = getRepository(Log);


    const log = repository.create(dados);


    await repository.save(log);

    return response.status(201).json(log);

  }
}