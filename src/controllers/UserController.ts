import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Funcionario from '../models/SismedFuncionario';
import FuncionarioView from '../views/FuncionarioView';

export default {

  async autenticacao(request: Request, response: Response) {
    const { cpf, senha } = request.body;
    const repository = getRepository(Funcionario);
    const funcionario = await repository.findOne({ cpf });
    const secretKey = process.env.SECRET_KEY;

    if (!funcionario) {
      return response.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(senha, funcionario.senha);

    if (!isValidPassword) {
      return response.sendStatus(401);
    }

    const token = jwt.sign({ id: funcionario.id }, secretKey || 'secretKey', { expiresIn: '1d' });

    return response.json(FuncionarioView.autenticacao(funcionario, token));
  },
};
