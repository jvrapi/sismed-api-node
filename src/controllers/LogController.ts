import Log from '../models/SismedLog';
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

  }
}