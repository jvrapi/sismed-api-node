import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Exame from '../models/SismedExame';
import ExameView from '../views/ExameView';

export default {

  async listarTodos(request: Request, response: Response) {

    const repository = getRepository(Exame);
    const exames = await repository.find({ relations: ['paciente'] });
    return response.json(ExameView.listar(exames))
  },

  async listarPorId(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Exame);
    const exame = await repository.findOne(
      {
        where: { id },
        relations:
          [
            'paciente',
            'paciente.tipoConvenio',
            'paciente.tipoConvenio.convenio',
            'laboratorio',
            'funcionario',
            'tipoConvenio'
          ]
      }
    );
    if (exame) {
      return response.json(ExameView.detalhes(exame));
    } else {
      return response.sendStatus(500)
    }
  },

  async salvar(request: Request, response: Response) {
    const {
      nome,
      descricao,
      dataColeta,
      dataEnvio,
      funcionarioLaboratorio,
      valor,
      tipoConvenioId,
      pacienteId,
      funcionarioId,
      laboratorioId
    } = request.body;
    const dados = {
      nome,
      descricao,
      dataColeta,
      dataEnvio,
      funcionarioLaboratorio,
      valor,
      tipoConvenioId,
      pacienteId,
      funcionarioId,
      laboratorioId
    };
    const repository = getRepository(Exame);
    const exame = repository.create(dados);
    await repository.save(exame);
    return response.status(201).json(exame);
  },

  async atualizar(request: Request, response: Response) {
    const {
      id,
      nome,
      descricao,
      dataColeta,
      dataEnvio,
      funcionarioLaboratorio,
      valor,
      tipoConvenioId,
      pacienteId,
      funcionarioId,
      laboratorioId
    } = request.body;
    const dados = {
      id,
      nome,
      descricao,
      dataColeta,
      dataEnvio,
      funcionarioLaboratorio,
      valor,
      tipoConvenioId,
      pacienteId,
      funcionarioId,
      laboratorioId
    };
    const repository = getRepository(Exame);
    const exame = repository.create(dados);
    await repository.save(exame);
    return response.status(201).json(exame);
  },

  async excluir(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Exame);
    try {
      await repository.delete(id)
      return response.json([]);
    } catch {
      return response.status(500).json({ messagem: 'Não foi possivel excluir o exame' })
    }
  }
}