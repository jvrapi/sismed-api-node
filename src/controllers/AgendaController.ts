import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Agenda from '../models/SismedAgenda';
import AgendaView from '../views/AgendaView';

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
      relations: ['paciente', 'paciente.tipoConvenio', 'paciente.tipoConvenio.convenio', 'tipoConvenio', 'tipoConvenio.convenio', 'procedimento'],
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
    const agendamento = repository.create(dados)
    const agendamentoSalvo = await repository.save(agendamento);
    return response.status(201).json(agendamentoSalvo);
  },

  async atualizar(request: Request, response: Response) {

    const {
      id,
      data,
      hora,
      paciente,
      funcionario,
      procedimento,
      tipoConvenio,
      pagou,
      primeiraVez,
      compareceu,
      finalizado
    } = request.body;




    const repository = getRepository(Agenda);
    const hasAgendamento = await repository.findOne(
      { data, hora, funcionarioId: parseInt(funcionario) },
    );
    if (hasAgendamento) {
      if (hasAgendamento.id != id) {
        return response.status(409).json({ messagem: 'Médico já possui agendamento para data e hora informados' });
      }
    }
    const dados = {
      id,
      data,
      hora,
      pacienteId: paciente,
      funcionarioId: funcionario,
      procedimentoId: procedimento,
      tipoConvenioId: tipoConvenio,
      pagou,
      primeiraVez,
      compareceu,
      finalizado
    };

    const agendamento = await repository.save(dados);
    return response.json(agendamento);

  },

  async listarPorId(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Agenda);
    const agendamento = await repository.findOne(
      {
        where: { id: parseInt(id) },
        relations: [
          'tipoConvenio',
          'tipoConvenio.convenio',
          'paciente',
          'paciente.tipoConvenio',
          'paciente.tipoConvenio.convenio',
          'funcionario',
          'procedimento',
          'procedimento.convenio'
        ]
      }
    );
    if (agendamento) {
      return response.json(AgendaView.detalhes(agendamento));

    } else {
      return response.sendStatus(200);
    }
  },
  async agendamentosAnteriores(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Agenda);
    const agendamentos = await repository.find(
      {
        where: { pacienteId: parseInt(id) },
        order: { data: 'DESC', hora: 'ASC' },
        relations: ['paciente', 'paciente.tipoConvenio', 'paciente.tipoConvenio.convenio', 'funcionario']
      }
    );
    return response.json(agendamentos);
  }
};
