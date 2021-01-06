import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Relatorio } from '../models/Relatorio';
import RelatorioView from '../views/RelatorioView';

export default {
  async salvar(request: Request, response: Response) {
    const {
      id,
      valor,
      data,
      hora,
      paciente,
      convenio,
      procedimento,
      funcionario,
      agendamento
    } = request.body;
    const repository = getRepository(Relatorio);
    const dados = {
      id,
      valor,
      data,
      hora,
      paciente,
      convenio,
      procedimento,
      funcionario,
      agendamento
    }
    const relatorio = repository.create(dados)
    const relatorioSalvo = await repository.save(relatorio);
    return response.status(201).json(relatorioSalvo);
  },

  async relatorio(request: Request, response: Response) {
    const { funcionarioId, convenioId, pacienteId, periodo } = request.body;
    const repository = getRepository(Relatorio);
    let query =
      'SELECT distinct f.nome AS funcionarioNome, p.nome AS pacienteNome, c.nome AS convenioNome, r.data, proc.descricao AS procedimento, r.valor '
      + 'FROM sismed_funcionario f INNER JOIN sismed_relatorio r ON r.funcionario = f.id '
      + 'INNER JOIN sismed_paciente p ON r.paciente = p.prontuario '
      + 'INNER JOIN sismed_tipo_convenio tc ON p.tipo_convenio = tc.id '
      + 'INNER JOIN sismed_convenio c ON tc.convenio_id = c.id '
      + 'INNER JOIN sismed_procedimento proc ON proc.convenio_id = c.id ';

    if (funcionarioId) {
      query += `WHERE f.id = ${funcionarioId} `;
    }

    if (convenioId) {
      if (+convenioId > 0 && (funcionarioId || pacienteId || periodo)) {
        query += `AND c.id = ${convenioId} `;
      } else if (+convenioId > 0) {
        query += `WHERE c.id = ${convenioId} `;
      }
    }

    if (pacienteId) {

      if (funcionarioId || convenioId || periodo) {
        query += `AND p.prontuario = ${pacienteId} `;
      } else {
        query += `WHERE p.prontuario = ${pacienteId} `;
      }
    }

    if (periodo.inicio) {

      if (funcionarioId || convenioId || pacienteId) {
        query += `AND r.data BETWEEN '${periodo.inicio}' AND '${periodo.fim}' `;
      } else {
        query += `WHERE r.data BETWEEN '${periodo.inicio}' AND '${periodo.fim}' `;

      }

    }


    const relatorio = await repository.query(query);

    return response.json(RelatorioView.relatorios(relatorio));
  }
}