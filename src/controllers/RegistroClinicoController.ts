import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import RegistroClinico from '../models/SismedRegistroClinico';

export default {
  async salvar(request: Request, response: Response) {
    const {
      data,
      hora,
      descricao,
      funcionarioId,
      agendamentoId,
      pacienteId
    } = request.body;
    const repository = getRepository(RegistroClinico);
    const dados = {
      data,
      hora,
      descricao,
      funcionarioId,
      agendamentoId,
      pacienteId
    }
    const registroClinico = repository.create(dados);
    const registroClinicoSalvo = await repository.save(registroClinico)
    return response.status(201).json(registroClinicoSalvo);

  }
}