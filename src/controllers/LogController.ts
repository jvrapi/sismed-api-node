import { Request, Response } from 'express';
import { Log } from '../models/Log';
import { getRepository } from 'typeorm'
import { data, hora } from '../functions'

export default {
  async salvar(funcionarioId: number, evento: string, descricao: string) {

    const dados = {

      funcionarioId,
      evento,
      descricao,
      data: data(),
      hora: hora()
    }

    const repository = getRepository(Log);


    const log = repository.create(dados);

    await repository.save(log);

    return log;

  },

  async listarTodos(request: Request, response: Response) {
    const repository = getRepository(Log);
    const logs = await repository.find({ relations: ['funcionario'] });
    return response.json(logs);
  }
}