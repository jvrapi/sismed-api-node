import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Relatorio from '../models/SismedRelatorio';

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
  }
}