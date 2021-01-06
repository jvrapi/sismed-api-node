import { Request, Response } from 'express';
import { Convenio } from '../models/Convenio';
import { TipoConvenio } from '../models/TipoConvenio';
import { Funcionario } from '../models/Funcionario';
import { getRepository } from 'typeorm';
import { FuncionarioTconvenio } from '../models/FuncionarioTconvenio';

export default {

  async conveniosAceitos(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Convenio);
    let convenios = await repository.createQueryBuilder('c')
      .select(['c.id AS id', 'c.nome AS nome'])
      .distinct(true)
      .innerJoin(TipoConvenio, 'tc', 'tc.convenioId = c.id')
      .innerJoin(FuncionarioTconvenio, 'ft', 'ft.tipoConvenioId = tc.id')
      .innerJoin(Funcionario, 'f', 'ft.funcionarioId = f.id')
      .where(`f.id = ${id}`)
      .orderBy('c.nome')
      .getRawMany();
    return response.json(convenios);
  },


  async tiposConvenioAceitos(request: Request, response: Response) {
    const { funcionarioId, convenioId } = request.params;
    const repository = getRepository(TipoConvenio);
    const tiposConvenio = await repository.createQueryBuilder('tc')
      .select(['tc.id AS id', 'tc.nome AS nome'])
      .innerJoin(FuncionarioTconvenio, 'ft', 'ft.tipoConvenioId = tc.id')
      .innerJoin(Funcionario, 'f', 'ft.funcionarioId = f.id')
      .where(`f.id = ${funcionarioId} AND tc.convenio_id = ${convenioId}`)
      .orderBy('tc.nome')
      .getRawMany();
    return response.json(tiposConvenio);
  },

  async conveniosNaoAceitos(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Convenio);
    const tConvenioRepository = getRepository(TipoConvenio);
    const tiposAceitos = tConvenioRepository.createQueryBuilder('tc')
      .select('tc.id AS id')
      .innerJoin(FuncionarioTconvenio, 'ft', 'ft.tipoConvenioId = tc.id')
      .where(`ft.funcionarioId = ${id}`)
      .getQuery()


    const convenios = await repository.createQueryBuilder('c')
      .select(['c.id AS id', 'c.nome AS nome'])
      .distinct(true)
      .innerJoin(TipoConvenio, 'tc', 'tc.convenioId = c.id')
      .where(`tc.id NOT IN (${tiposAceitos})`)
      .orderBy('c.nome')
      .getRawMany()
    response.json(convenios);

  },

  async tiposConvenioNaoAceitos(request: Request, response: Response) {
    const { funcionarioId, convenioId } = request.params;
    const repository = getRepository(TipoConvenio);

    const tiposAceitos = await repository.createQueryBuilder('tc')
      .select('tc.id AS id')
      .innerJoin(FuncionarioTconvenio, 'ft', 'ft.tipoConvenioId = tc.id')
      .where(`ft.funcionarioId = ${funcionarioId}`)
      .getQuery()

    const tiposNaoAceitos = await repository.createQueryBuilder('tc')
      .select(['tc.id AS id', 'tc.nome AS nome'])
      .where(`tc.id NOT IN (${tiposAceitos}) AND tc.convenioId = ${convenioId}`)
      .orderBy('tc.nome')
      .getRawMany()

    return response.json(tiposNaoAceitos);

  },

  async salvar(request: Request, response: Response) {
    const funcionarioTConvenio: FuncionarioTconvenio[] = request.body;
    const repository = getRepository(FuncionarioTconvenio);
    const resposta = await Promise.all(funcionarioTConvenio.map(async funcTconvenio => {
      const funcionarioTconvenio = repository.create(funcTconvenio);
      await repository.save(funcionarioTconvenio);
      return funcionarioTconvenio;
    }));

    response.status(201).json(resposta)
  },

  async excluir(request: Request, response: Response) {
    const dados: FuncionarioTconvenio[] = request.body;
    const repository = getRepository(FuncionarioTconvenio);
    try {
      dados.forEach(async funcTconvenio => {
        await repository.delete(
          {
            funcionarioId: funcTconvenio.funcionarioId,
            tipoConvenioId: funcTconvenio.tipoConvenioId
          }
        );
      })
      return response.json([]);
    } catch {
      return response.sendStatus(500);

    }


  }
}

