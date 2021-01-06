import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Funcionario } from '../models/Funcionario';
import { Paciente } from '../models/Paciente';
import { RegistroClinico } from '../models/RegistroClinico';
import RegistroClinicoView from '../views/RegistroClinicoView';

export default {
  async listarTodos(request: Request, response: Response) {
    const repository = getRepository(RegistroClinico);
    try {
      const registros = await repository.query(
        '(SELECT p.nome, p.prontuario, r.data,  r.hora,COUNT(*) AS quantidade '
        + 'FROM registro_clinico r INNER JOIN paciente p ON r.paciente_id = p.prontuario '
        + 'GROUP BY paciente_id) '
        + 'UNION'
        + '(SELECT p.nome, p.prontuario, r.data, r.hora, NULL AS quantidade '
        + 'FROM paciente p LEFT JOIN registro_clinico r ON p.prontuario = r.paciente_id '
        + 'WHERE r.paciente_id IS NULL) ORDER BY data DESC, hora DESC');
      return response.json(registros);
    } catch {
      return response.status(500).json({ messagem: 'Erro ao tentar listar registros' })
    }


  },

  async listarPorId(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(RegistroClinico);
    const registro = await repository.findOne(
      {
        where: { id },
        relations:
          [
            'funcionario',
            'agendamento',
            'paciente',
            'paciente.tipoConvenio',
            'paciente.tipoConvenio.convenio'
          ]
      }
    );
    if (registro) {
      return response.json(RegistroClinicoView.detalhes(registro));
    } else {
      return response.status(404).json([])
    }
  },

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
    await repository.save(registroClinico)
    return response.status(201).json(registroClinico);

  },

  async atualizar(request: Request, response: Response) {
    const {
      id,
      data,
      hora,
      descricao,
      funcionarioId,
      agendamentoId,
      pacienteId
    } = request.body;
    const repository = getRepository(RegistroClinico);
    const dados = {
      id,
      data,
      hora,
      descricao,
      funcionarioId,
      agendamentoId,
      pacienteId
    }
    const registroClinico = await repository.save(dados)
    return response.json(registroClinico);

  },

  async excluir(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(RegistroClinico);
    try {
      await repository.delete(id)
      return response.json([])
    } catch {
      return response.status(500).json({ messagem: 'Não foi possivel excluir o registro clínico' })
    }
  },

  async listarPorPaciente(request: Request, response: Response) {
    const { prontuario, medicoId } = request.params;
    const repository = getRepository(RegistroClinico);
    const registros = await repository.find(
      {
        where:
        {
          pacienteId: prontuario,
          funcionarioId: medicoId
        },
        relations: ['paciente', 'funcionario'],
        order: { data: 'DESC', hora: 'DESC' }
      }
    );
    return response.json(RegistroClinicoView.listar(registros));
  },

  async listarPorNome(request: Request, response: Response) {
    const { nome } = request.params;
    const repository = getRepository(RegistroClinico);
    const registros = await repository.createQueryBuilder('rc')
      .select(['p.prontuario as prontuario', 'p.nome as nome', 'rc.data as data', 'rc.hora as hora', 'COUNT(rc.id) AS quantidade'])
      .innerJoin(Paciente, 'p', 'rc.pacienteId = p.prontuario')
      .where(`p.nome LIKE '%${nome}%'`)
      .groupBy('p.nome')
      .getRawMany()
    return response.json(registros)
  },

  async listarPorProntuario(request: Request, response: Response) {
    const { prontuario } = request.params;
    const repository = getRepository(RegistroClinico);
    const registros = await repository.createQueryBuilder('rc')
      .select(['p.prontuario as prontuario', 'p.nome as nome', 'rc.data as data', 'rc.hora as hora', 'COUNT(rc.id) AS quantidade'])
      .innerJoin(Paciente, 'p', 'rc.pacienteId = p.prontuario')
      .where(`p.prontuario = ${prontuario} `)
      .groupBy('p.nome')
      .getRawMany()
    return response.json(registros)
  },

  async listarPorData(request: Request, response: Response) {
    const { data } = request.params;
    const repository = getRepository(RegistroClinico);
    const registros = await repository.createQueryBuilder('rc')
      .select(['p.prontuario as prontuario', 'p.nome as nome', 'rc.data as data', 'rc.hora as hora', 'COUNT(rc.id) AS quantidade'])
      .innerJoin(Paciente, 'p', 'rc.pacienteId = p.prontuario')
      .where(`rc.data = '${data}' `)
      .groupBy('p.nome')
      .getRawMany()
    return response.json(registros)
  }
}