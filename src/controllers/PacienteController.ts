import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Paciente from '../models/SismedPaciente';

export default {
  async listarTodos(request: Request, response: Response) {
    const patientRepository = getRepository(Paciente);
    const patients = await patientRepository.find({
      relations: ['tipoConvenio', 'endereco'],
    });

    return response.json(patients);
  },

  async listarPorProntuario(request: Request, response: Response) {
    const { prontuario } = request.params;
    const pacienteRepository = getRepository(Paciente);
    const paciente = await pacienteRepository.findOne(
      { where: { prontuario: parseInt(prontuario) }, relations: ['tipoConvenio', 'tipoConvenio.convenio'] },
    );

    return response.json(paciente);
  },

};
