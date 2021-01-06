import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Exame } from '../models/Exame';
import ExameView from '../views/ExameView';
import LogController from './LogController';
import { formatarData } from '../functions'

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

  async pesquisa(request: Request, response: Response) {
    const { pacienteNome, exame, dataColeta } = request.query;
    const repository = getRepository(Exame);
    let queryString = 'SELECT e.id, e.nome, e.data_coleta, e.data_envio, e.data_retorno,p.nome as pacienteNome'
      + ' FROM sismed_exame e INNER JOIN sismed_paciente p ON e.paciente_id = p.prontuario '
      + 'WHERE ';

    if (pacienteNome) {
      queryString += `p.nome LIKE '%${pacienteNome}%' `;
    }
    if (exame) {
      if (pacienteNome || dataColeta) {
        queryString += `AND e.nome LIKE '%${exame}%' `;
      } else {
        queryString += `e.nome LIKE '%${exame}%' `;

      }
    }
    if (dataColeta) {
      if (pacienteNome || exame) {
        queryString += `AND e.data_coleta = '${dataColeta}' `;
      } else {
        queryString += `e.data_coleta = '${dataColeta}' `;

      }
    }

    const exames = await repository.query(queryString);

    return response.json(ExameView.pesquisa(exames));
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
      dataRetorno,
      funcionarioLaboratorio,
      valor,
      tipoConvenioId,
      pacienteId,
      funcionarioId,
      laboratorioId
    } = request.body;
    const repository = getRepository(Exame);
    const exameBD = await repository.findOne({ where: { id }, relations: ['paciente'] });

    if (dataRetorno) {


      if (exameBD?.dataRetorno !== null && exameBD?.dataRetorno !== dataRetorno) {
        await LogController.salvar(request.userId, 'EDIÇÃO',
          `ALTERAÇÃO NA DATA DE RETORNO DO EXAME ${exameBD?.nome} DO PACIENTE ${exameBD?.paciente.nome}. `
          + `DA DATA ${formatarData(exameBD?.dataRetorno || '')} PARA A DATA ${formatarData(dataRetorno)}`
        );
      } else if (!exameBD?.dataRetorno) {

        await LogController.salvar(request.userId, 'EDIÇÃO',
          `ALTERAÇÃO NA DATA DE RETORNO DO EXAME ${exameBD?.nome} DO PACIENTE ${exameBD?.paciente.nome}. `
          + `DE RETORNO PENDENTE PARA A DATA ${formatarData(dataRetorno)}`
        );
      }
    } else {
      if (exameBD?.dataRetorno) {
        await LogController.salvar(request.userId, 'EDIÇÃO',
          `ALTERAÇÃO NA DATA DE RETORNO DO EXAME ${exameBD?.nome} DO PACIENTE ${exameBD?.paciente.nome}. `
          + `DA DATA ${formatarData(exameBD?.dataRetorno)} PARA RETORNO PENDENTE`
        );
      }
    }

    if (exameBD?.dataEnvio !== dataEnvio) {
      await LogController.salvar(request.userId, 'EDIÇÃO',
        `ALTERAÇÃO NA DATA DE ENVÍO DO EXAME ${exameBD?.nome} DO PACIENTE ${exameBD?.paciente.nome}. `
        + `DA DATA ${formatarData(exameBD?.dataEnvio || '')} PARA A DATA ${formatarData(dataEnvio)}`
      );
    }

    if (exameBD?.dataColeta !== dataColeta) {
      await LogController.salvar(request.userId, 'EDIÇÃO',
        `ALTERAÇÃO NA DATA DE COLETA DO EXAME ${exameBD?.nome} DO PACIENTE ${exameBD?.paciente.nome}. `
        + `DA DATA ${formatarData(exameBD?.dataColeta || '')} PARA A DATA ${formatarData(dataColeta)}`
      );
    }


    const dados = {
      id,
      nome,
      descricao,
      dataColeta,
      dataEnvio,
      dataRetorno,
      funcionarioLaboratorio,
      valor,
      tipoConvenioId,
      pacienteId,
      funcionarioId,
      laboratorioId
    };

    const exame = repository.create(dados);
    await repository.save(exame);
    return response.json(exame);
  },

  async excluir(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Exame);
    const exame = await repository.findOne({ where: { id }, relations: ['paciente'] });
    await LogController.salvar(request.userId, 'EXCLUSÃO', `EXCLUSÃO DO EXAME ${exame?.nome} DO PACIENTE ${exame?.paciente.nome}`)
    try {
      await repository.delete(id)
      return response.json([]);
    } catch {
      return response.status(500).json({ messagem: 'Não foi possivel excluir o exame' })
    }
  }
}