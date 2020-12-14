import { Request, Response } from 'express';
import { getRepository, IsNull, Not } from 'typeorm';
import Funcionario from '../models/SismedFuncionario';
import Convenio from '../models/SismedConvenio';
import TipoConvenio from '../models/SismedTipoConvenio';
import FuncionarioView from '../views/FuncionarioView';

export default {
  async listarTodos(request: Request, response: Response) {
    const repository = getRepository(Funcionario);
    const funcionarios = await repository.find();
    return response.json(FuncionarioView.funcionarios(funcionarios));
  },

  async listarPorId(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Funcionario);
    const funcionario = await repository.findOne({ id: parseInt(id) });
    return response.json(FuncionarioView.funcionario(funcionario));
  },

  async medicos(request: Request, response: Response) {
    const repository = getRepository(Funcionario);
    const medicos = await repository.find({ crm: Not(IsNull()) });
    return response.json(FuncionarioView.medicos(medicos));
  },

  async conveniosAceitos(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Convenio);
    let convenios = await repository.query(
      'SELECT distinct c.* '
      + 'FROM sismed_funcionario f INNER JOIN sismed_funcionario_tconvenio ft '
      + 'ON f.id = ft.funcionario_id '
      + 'INNER JOIN sismed_tipo_convenio tc ON tc.id = ft.tipo_convenio_id '
      + 'INNER JOIN sismed_convenio c ON c.id = tc.convenio_id WHERE '
      + `funcionario_id = ${id}`,
    );
    convenios = convenios.filter((convenio: Convenio) => {
      if (convenio.id !== 14) {
        return convenio;
      }
    });
    return response.json(convenios);
  },

  async tiposConvenioAceitos(request: Request, response: Response) {
    const { funcionarioId, convenioId } = request.params;
    const repository = getRepository(TipoConvenio);
    const tiposConvenio = await repository.query(
      'SELECT tc.* '
      + 'FROM sismed_funcionario f INNER JOIN sismed_funcionario_tconvenio ft ON f.id = ft.funcionario_id '
      + 'INNER JOIN sismed_tipo_convenio tc ON ft.tipo_convenio_id = tc.id '
      + `WHERE f.id = ${funcionarioId} AND tc.convenio_id = ${convenioId} `,
    );
    return response.json(tiposConvenio);
  },

};
