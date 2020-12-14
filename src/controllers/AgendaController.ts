import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Agenda from '../models/SismedAgenda';

export default {
  async listarTodos(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Agenda);
    const agendamentos = await repository.find({
      funcionarioId: parseInt(id),
    });

    return response.json(agendamentos);
  },

  async listarPorData(request: Request, response: Response) {
    const { id, data } = request.params;
    const repository = getRepository(Agenda);
    const agendamentos = await repository.find({
      where: {
        funcionarioId: parseInt(id),
        data,
      },
      relations: ['paciente', 'tipoConvenio', 'tipoConvenio.convenio'],
    });
    return response.json(agendamentos);
  },

  async ultimoAgendamento(request: Request, response: Response) {
    const { prontuario } = request.params;
    const repository = getRepository(Agenda);
    const agendamento = await repository.createQueryBuilder('a').where(`a.pacienteId = ${parseInt(prontuario)}`).orderBy('a.id').take(1)
      .getOne();
    return response.json(agendamento);
  },

  async agendar(request: Request, response: Response) {
    const {
      data,
      hora,
      paciente,
      funcionario,
      procedimento,
      tipoConvenio,
      pagou,
      primeiraVez,
      compareceu,
    } = request.body;
    const repository = getRepository(Agenda);
    const hasAgendamento = await repository.find(
      { data, hora, funcionarioId: parseInt(funcionario) },
    );
    if (hasAgendamento.length > 0) {
      return response.status(409).json({ messagem: 'Médico já possui agendamento para data e hora informados' });
    }
    const dados = {
      data,
      hora,
      pacienteId: paciente,
      funcionarioId: funcionario,
      procedimentoId: procedimento,
      tipoConvenioId: tipoConvenio,
      pagou,
      primeiraVez,
      compareceu,
    };
    const agendamento = await repository.save(dados);
    return response.status(201).json(agendamento);
  },
};
