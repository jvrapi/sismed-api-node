import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import Paciente from '../models/SismedPaciente';
import PacienteView from '../views/PacienteView';
export default {
  async listarTodos(request: Request, response: Response) {
    const patientRepository = getRepository(Paciente);
    const pacientes = await patientRepository.find({
      relations: ['tipoConvenio', 'tipoConvenio.convenio', 'endereco'],
      order: { nome: 'ASC' }
    });

    return response.json(PacienteView.listar(pacientes));
  },

  async detalhes(request: Request, response: Response) {
    const { prontuario } = request.params;
    const pacienteRepository = getRepository(Paciente);
    const paciente = await pacienteRepository.findOne(
      {
        where: { prontuario: parseInt(prontuario) },
        relations: ['tipoConvenio', 'tipoConvenio.convenio']
      },
    );

    return response.json(paciente);
  },

  async listarPorProntuario(request: Request, response: Response) {
    const { prontuario } = request.params;
    const pacienteRepository = getRepository(Paciente);
    const paciente = await pacienteRepository.find(
      {
        where: { prontuario: prontuario },
        relations: ['tipoConvenio', 'tipoConvenio.convenio']
      },
    );

    return response.json(paciente);
  },

  async listarPorNome(request: Request, response: Response) {
    const { nome } = request.params;
    const repository = getRepository(Paciente);
    const pacientes = await repository.find(
      {
        where: { nome: Like(`%${nome}%`) },
        relations: ['tipoConvenio', 'tipoConvenio.convenio']
      }
    );
    return response.json(PacienteView.listar(pacientes));
  },

  async listarPorCpf(request: Request, response: Response) {
    const { cpf } = request.params;
    const repository = getRepository(Paciente);
    const pacientes = await repository.find(
      {
        where: { cpf: Like(`%${cpf}%`) },
        relations: ['tipoConvenio', 'tipoConvenio.convenio']
      }
    );
    return response.json(PacienteView.listar(pacientes));
  },

  async listarPorCelular(request: Request, response: Response) {
    const { celular } = request.params;
    const repository = getRepository(Paciente);
    const pacientes = await repository.find(
      {
        where: { celular: Like(`%${celular}%`) },
        relations: ['tipoConvenio', 'tipoConvenio.convenio']
      }
    );
    return response.json(PacienteView.listar(pacientes));
  },

  async listarPorTelefone(request: Request, response: Response) {
    const { telefone } = request.params;
    const repository = getRepository(Paciente);
    const pacientes = await repository.find(
      {
        where:
          [
            { telefoneFixo: Like(`%${telefone}%`) },
            { telefoneTrabalho: Like(`%${telefone}%`) }
          ],
        relations: ['tipoConvenio', 'tipoConvenio.convenio']
      }
    );
    return response.json(PacienteView.listar(pacientes));
  },

};
