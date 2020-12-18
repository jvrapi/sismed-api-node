import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Funcionario from '../models/SismedFuncionario';
import Paciente from '../models/SismedPaciente';
import RegistroClinico from '../models/SismedRegistroClinico';

export default {
  async listarTodos(request: Request, response: Response) {
    const repository = getRepository(RegistroClinico);
    const registros = await repository.query(
      '(SELECT p.nome, p.prontuario, f.nome as funcionarioNome, r.id, r.data, r.descricao, r.hora '
      + 'FROM sismed_registro_clinico r JOIN sismed_paciente p ON r.paciente_id = p.prontuario '
      + 'JOIN sismed_funcionario f on f.id = r.funcionario_id '
      + 'WHERE r.id IN (SELECT MAX(id) FROM sismed_registro_clinico GROUP BY paciente_id))'
      + 'UNION'
      + '(SELECT p.nome, p.prontuario, NULL as func_nome, r.id, r.data, r.descricao, r.hora '
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

  }
}