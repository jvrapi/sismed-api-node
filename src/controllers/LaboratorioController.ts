import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import { Endereco } from '../models/Endereco';
import { Laboratorio } from '../models/Laboratorio';
import { LaboratorioTconvenio } from '../models/LaboratorioTconvenio';

import LaboratorioView from '../views/LaboratorioView';

interface Lab {
  id: number;
  nome: string;
  responsavel: string;
  telefoneFixo: string;
  bairro: string;
  cidade: string;
}

export default {

  async listarTodos(request: Request, response: Response) {
    const repository = getRepository(Laboratorio);
    const laboratorios = await repository.find({ relations: ['endereco'] });
    return response.json(LaboratorioView.listar(laboratorios))
  },

  async listarPorId(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Laboratorio);
    const laboratorio = await repository.findOne(
      {
        where: { id },
        relations: ['endereco']
      }
    );
    return response.json(laboratorio)
  },

  async listarPorNome(request: Request, response: Response) {
    const { nome } = request.params;
    const repository = getRepository(Laboratorio);
    const laboratorios = await repository.find(
      {
        where: { nome: Like(`%${nome}%`) },
        relations: ['endereco']
      }
    );
    return response.json(LaboratorioView.listar(laboratorios))
  },

  async listarPorTelefone(request: Request, response: Response) {
    const { telefone } = request.params;
    const repository = getRepository(Laboratorio);
    const laboratorios = await repository.find(
      {
        where: { telefoneFixo: Like(`%${telefone}%`) },
        relations: ['endereco']
      }
    );
    return response.json(LaboratorioView.listar(laboratorios))
  },

  async listarPorBairro(request: Request, response: Response) {
    const { bairro } = request.params;
    const repository = getRepository(Laboratorio);
    let laboratorios = await repository.createQueryBuilder('l')
      .select(
        [
          'l.id as id',
          'l.nome as nome',
          'l.responsavel as responsavel',
          'l.telefoneFixo as telefoneFixo',
          'e.bairro as bairro',
          'e.cidade as cidade'
        ]
      )
      .innerJoin(Endereco, 'e', 'e.id = l.enderecoId')
      .where(`e.bairro LIKE '%${bairro}%'`)
      .getRawMany();

    laboratorios = laboratorios.map((laboratorio: Lab) => {
      return {
        id: laboratorio.id,
        nome: laboratorio.nome,
        responsavel: laboratorio.responsavel,
        telefoneFixo: laboratorio.telefoneFixo,
        endereco: {
          bairro: laboratorio.bairro,
          cidade: laboratorio.cidade
        }

      }
    })

    return response.json(LaboratorioView.listar(laboratorios))
  },

  async listarPorTipoConvenio(request: Request, response: Response) {
    const { tipoConvenio } = request.params;
    const repository = getRepository(Laboratorio);
    let laboratorios = await repository.createQueryBuilder('l')
      .select(['l.id as id', 'l.nome as nome'])
      .innerJoin(LaboratorioTconvenio, 'ltc', 'ltc.laboratorioId = l.id')
      .where(`ltc.tipoConvenioId = ${tipoConvenio}`)
      .getRawMany();

    return response.json(laboratorios)
  },



  async salvar(request: Request, response: Response) {
    const {
      nome,
      cnpj,
      responsavel,
      telefoneFixo,
      email,
      endereco
    } = request.body;
    const dados = {
      nome,
      cnpj,
      responsavel,
      telefoneFixo,
      email,
      endereco
    }
    console.log(dados)
    const repository = getRepository(Laboratorio);
    const laboratorio = repository.create(dados);
    await repository.save(laboratorio);
    return response.status(201).json(laboratorio);
  },

  async atualizar(request: Request, response: Response) {
    const {
      id,
      nome,
      cnpj,
      responsavel,
      telefoneFixo,
      email,
      endereco
    } = request.body;
    const dados = {
      id,
      nome,
      cnpj,
      responsavel,
      telefoneFixo,
      email,
      endereco
    }
    const repository = getRepository(Laboratorio);
    const laboratorio = await repository.save(dados);
    return response.json(laboratorio);
  },

  async excluir(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Laboratorio);
    try {
      await repository.delete(id);
      return response.status(200).json([]);
    } catch {
      return response.sendStatus(500).json({ messagem: 'Não foi possivel excluir o laboratório' });
    }
  },



}

