import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import Paciente from '../models/SismedPaciente';
import PacienteView from '../views/PacienteView';
import { getManager } from 'typeorm';

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
        where: { prontuario: prontuario },
        relations:
          [
            'tipoConvenio',
            'tipoConvenio.convenio',
            'endereco'
          ]
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
        relations: ['tipoConvenio', 'tipoConvenio.convenio'],
        take: 50
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
        relations: ['tipoConvenio', 'tipoConvenio.convenio'],
        take: 50
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
        relations: ['tipoConvenio', 'tipoConvenio.convenio'],
        take: 50
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
        relations: ['tipoConvenio', 'tipoConvenio.convenio'],
        take: 50
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
        relations: ['tipoConvenio', 'tipoConvenio.convenio'],
        take: 50
      }
    );
    return response.json(PacienteView.listar(pacientes));
  },

  async atualizar(request: Request, response: Response) {
    const {
      prontuario,
      nome,
      dataNascimento,
      cpf,
      rg,
      orgaoEmissor,
      dataEmissao,
      naturalidade,
      nacionalidade,
      telefoneFixo,
      telefoneTrabalho,
      celular,
      email,
      sexo,
      estadoCivil,
      escolaridade,
      profissao,
      recomendacao,
      tipoConvenio,
      carteiraConvenio,
      validade,
      situacao,
      endereco
    } = request.body;
    const repository = getRepository(Paciente);

    const dados = {
      prontuario,
      nome,
      dataNascimento,
      cpf,
      rg,
      orgaoEmissor,
      dataEmissao,
      naturalidade,
      nacionalidade,
      telefoneFixo,
      telefoneTrabalho,
      celular,
      email,
      sexo,
      estadoCivil,
      escolaridade,
      profissao,
      recomendacao,
      tipoConvenio,
      carteiraConvenio,
      validade,
      situacao,
      endereco
    }

    const paciente = await repository.save(dados)

    return response.json(paciente)

  },

  async salvar(request: Request, response: Response) {

    const {
      nome,
      dataNascimento,
      cpf,
      rg,
      orgaoEmissor,
      dataEmissao,
      naturalidade,
      nacionalidade,
      telefoneFixo,
      telefoneTrabalho,
      celular,
      email,
      sexo,
      estadoCivil,
      escolaridade,
      profissao,
      recomendacao,
      tipoConvenio,
      carteiraConvenio,
      validade,
      situacao,
      endereco
    } = request.body;
    const repository = getRepository(Paciente);

    const dados = {
      nome,
      dataNascimento,
      cpf,
      rg,
      orgaoEmissor,
      dataEmissao,
      naturalidade,
      nacionalidade,
      telefoneFixo,
      telefoneTrabalho,
      celular,
      email,
      sexo,
      estadoCivil,
      escolaridade,
      profissao,
      recomendacao,
      tipoConvenio,
      carteiraConvenio,
      validade,
      situacao,
      endereco
    }

    const paciente = repository.create(dados);
    await repository.save(paciente);

    return response.status(201).json(paciente)
  },

  async excluir(request: Request, response: Response) {

    const { prontuario } = request.params;
    const repository = getRepository(Paciente);
    try {
      await repository.delete(prontuario);
      return response.status(200).json([]);
    } catch {
      return response.sendStatus(500).json({ messagem: 'Erro ao tentar excluir o paciente' })
    }
  },

  async proximoProntuario(request: Request, response: Response) {
    const entityManager = getManager();
    const prontuario = await entityManager.query(
      `SELECT AUTO_INCREMENT AS proximoProntuario FROM information_schema.tables `
      + `WHERE table_name = 'sismed_paciente' AND table_schema = 'macmassc_sismed'`
    );
    return response.json(prontuario[0]);
  }

};


