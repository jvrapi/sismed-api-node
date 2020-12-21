import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Funcionario from '../models/SismedFuncionario';
import Paciente from '../models/SismedPaciente';
import RegistroClinico from '../models/SismedRegistroClinico';
import RegistroClinicoView from '../views/RegistroClinicoView';

export default {
  async listarTodos(request: Request, response: Response) {
    const repository = getRepository(RegistroClinico);
    const registros = await repository.query(
      '(SELECT p.nome, p.prontuario, r.data,  r.hora,COUNT(*) AS quantidade '
      + 'FROM sismed_registro_clinico r INNER JOIN sismed_paciente p ON r.paciente_id = p.prontuario '
      + 'GROUP BY paciente_id) '
      + 'UNION'
      + '(SELECT p.nome, p.prontuario, r.data, r.hora, NULL AS quantidade '
      + 'FROM sismed_paciente p LEFT JOIN sismed_registro_clinico r ON p.prontuario = r.paciente_id '
      + 'WHERE r.paciente_id IS NULL) ORDER BY data DESC, hora DESC');
    return response.json(registros);
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
        order: { data: 'ASC', hora: 'ASC' }
      }
    );
    return response.json(RegistroClinicoView.listar(registros));
  }
}