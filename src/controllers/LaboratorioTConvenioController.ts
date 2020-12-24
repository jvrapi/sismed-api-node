import Convenio from '../models/SismedConvenio';
import TipoConvenio from '../models/SismedTipoConvenio';
import LaboratorioTipoConvenio from '../models/SismedLaboratorioTconvenio';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

interface TodosOsTipos {
  id: number;
  nome: string;
  convenioId: number;
  convenioNome: string;
}

export default {

  async listarConveniosAceitos(request: Request, response: Response) {
    const { laboratorioId } = request.params;
    const repository = getRepository(Convenio);
    const convenios = await repository.createQueryBuilder('c')
      .select(['c.id as id', 'c.nome as nome'])
      .distinct(true)
      .innerJoin(TipoConvenio, 'tc', 'tc.convenioId = c.id')
      .innerJoin(LaboratorioTipoConvenio, 'ltc', 'ltc.tipoConvenioId = tc.id')
      .where(`ltc.laboratorioId = ${laboratorioId}`)
      .orderBy('c.nome')
      .getRawMany();
    return response.json(convenios);
  },

  async listarConveniosNaoAceitos(request: Request, response: Response) {
    const { laboratorioId } = request.params;
    const repository = getRepository(Convenio);
    const tipoConvenioRepository = getRepository(TipoConvenio);
    const subQuery = await tipoConvenioRepository.createQueryBuilder('tc')
      .select('tc.id as id')
      .innerJoin(LaboratorioTipoConvenio, 'ltc', 'ltc.tipoConvenioId = tc.id')
      .where(`ltc.laboratorioId = ${laboratorioId}`)
      .getQuery()
    const convenios = await repository.createQueryBuilder('c')
      .select(['c.id as id', 'c.nome as nome'])
      .distinct(true)
      .innerJoin(TipoConvenio, 'tc', 'tc.convenioId = c.id')
      .where(`tc.id NOT IN (${subQuery})`)
      .orderBy('c.nome')
      .getRawMany();
    return response.json(convenios);
  },

  async listarTiposAceitos(request: Request, response: Response) {
    const { laboratorioId, convenioId } = request.params
    const repository = getRepository(TipoConvenio);
    const tiposAceitos = await repository.createQueryBuilder('tc')
      .select(['tc.id as id', 'tc.nome as nome'])
      .distinct(true)
      .innerJoin(LaboratorioTipoConvenio, 'ltc', 'ltc.tipoConvenioId = tc.id')
      .where(`ltc.laboratorioId = ${laboratorioId} AND tc.convenioId = ${convenioId}`)
      .orderBy('tc.nome')
      .getRawMany();
    return response.json(tiposAceitos)
  },

  async listarTiposNaoAceitos(request: Request, response: Response) {
    const { laboratorioId, convenioId } = request.params
    const repository = getRepository(TipoConvenio);
    const subQuery = await repository.createQueryBuilder('tc')
      .select('tc.id as id')
      .innerJoin(LaboratorioTipoConvenio, 'ltc', 'ltc.tipoConvenioId = tc.id')
      .where(`ltc.laboratorioId = ${laboratorioId} AND tc.convenioId = ${convenioId}`)
      .getQuery()
    const tiposNaoAceitos = await repository.createQueryBuilder('tc')
      .select(['tc.id as id', 'tc.nome as nome'])
      .innerJoin(Convenio, 'c', 'tc.convenioId = c.id')
      .where(`tc.convenioId = ${convenioId} AND tc.id NOT IN (${subQuery})`)
      .orderBy('tc.nome')
      .getRawMany()
    return response.json(tiposNaoAceitos)
  },
  async listarTodosOsTipos(request: Request, response: Response) {
    const { laboratorioId } = request.params
    const repository = getRepository(Convenio);
    let todosOsTipos = await repository.createQueryBuilder('c')
      .select(
        [
          'tc.id as id',
          'tc.nome as nome',
          'c.id as convenioId',
          'c.nome as convenioNome'
        ]
      )
      .innerJoin(TipoConvenio, 'tc', 'tc.convenioId = c.id')
      .innerJoin(LaboratorioTipoConvenio, 'ltc', 'ltc.tipoConvenioId = tc.id')
      .where(`ltc.laboratorioId = ${laboratorioId}`)
      .orderBy('c.nome')
      .getRawMany();

    todosOsTipos = todosOsTipos.map((tipos: TodosOsTipos) => {
      return {
        id: tipos.id,
        nome: tipos.nome,
        convenio: {
          id: tipos.convenioId,
          nome: tipos.convenioNome
        }
      }
    });

    return response.json(todosOsTipos)
  },


  async salvar(request: Request, response: Response) {
    const laboratorioTConvenio: LaboratorioTipoConvenio[] = request.body;
    const repository = getRepository(LaboratorioTipoConvenio)

    const resposta = await Promise.all(laboratorioTConvenio.map(async labTconvenio => {
      const laboratorioTconvenio = repository.create(labTconvenio);
      await repository.save(laboratorioTconvenio);
      return laboratorioTconvenio;
    }));

    return response.status(201).json(resposta)
  },


  async excluir(request: Request, response: Response) {
    const laboratorioTConvenio: LaboratorioTipoConvenio[] = request.body;
    const repository = getRepository(LaboratorioTipoConvenio);
    try {
      laboratorioTConvenio.forEach(async labTconvenio => {
        await repository.delete({
          laboratorioId: labTconvenio.laboratorioId,
          tipoConvenioId: labTconvenio.tipoConvenioId
        });
      })

      return response.json([]);
    } catch {
      return response.sendStatus(500);
    }

  },
}