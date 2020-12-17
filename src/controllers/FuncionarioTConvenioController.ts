import { Request, Response } from 'express';
import Convenio from '../models/SismedConvenio';
import TipoConvenio from '../models/SismedTipoConvenio';
import Funcionario from '../models/SismedFuncionario';
import { getRepository } from 'typeorm';
import FuncionarioTipoConvenio from '../models/SismedFuncionarioTconvenio';

export default {
  async conveniosAceitos(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Convenio);
    let convenios = await repository.createQueryBuilder('c')
      .select(['c.id AS id', 'c.nome AS nome'])
      .distinct(true)
      .innerJoin(TipoConvenio, 'tc', 'tc.convenioId = c.id')
      .innerJoin(FuncionarioTipoConvenio, 'ft', 'ft.tipoConvenioId = tc.id')
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
      .innerJoin(FuncionarioTipoConvenio, 'ft', 'ft.tipoConvenioId = tc.id')
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
      .innerJoin(FuncionarioTipoConvenio, 'ft', 'ft.tipoConvenioId = tc.id')
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
      .innerJoin(FuncionarioTipoConvenio, 'ft', 'ft.tipoConvenioId = tc.id')
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
    const funcionarioTConvenio: FuncionarioTipoConvenio[] = request.body;
    const repository = getRepository(FuncionarioTipoConvenio);
    const resposta = await Promise.all(funcionarioTConvenio.map(async funcTconvenio => {
      const funcionarioTconvenio = repository.create(funcTconvenio);
      await repository.save(funcionarioTconvenio);
      return funcionarioTconvenio;
    }));

    response.status(201).json(resposta)
  }
}

