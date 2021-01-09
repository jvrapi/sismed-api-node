import { Request, Response } from 'express';
import { getRepository, IsNull, Not } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Funcionario } from '../models/Funcionario';
import FuncionarioView from '../views/FuncionarioView';
import * as nodemailer from "nodemailer";
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { gerarHTML } from '../functions';


export default {

  async autenticacao(request: Request, response: Response) {
    const { cpf, senha } = request.body;
    const repository = getRepository(Funcionario);
    const funcionario = await repository.findOne({ cpf });
    const secretKey = process.env.SECRET_KEY;

    if (funcionario) {
      if (funcionario.dataTermino) {
        return response
          .status(401)
          .json({ messagem: 'CPF não possui acesso ao sistema' });
      } else {
        const isValidPassword = await bcrypt.compare(senha, funcionario.senha);

        if (!isValidPassword) {

          return response.sendStatus(404);
        }

        const token = jwt.sign({ id: funcionario.id }, secretKey || 'secretKey', { expiresIn: '1d' });

        return response.json(FuncionarioView.autenticacao(funcionario, token));
      }
    } else {
      return response.status(500).json({ messagem: 'CPF não encontrado' });
    }


  },

  async verificarUsuario(request: Request, response: Response) {
    const { cpf } = request.params;

    const repository = getRepository(Funcionario);

    const funcionario = await repository.findOne({ where: { cpf } });

    if (funcionario) {

      if (funcionario.dataTermino) {

        return response
          .status(401)
          .json({ messagem: 'CPF não possui acesso ao sistema' });
      } else {
        const host = process.env.EMAIL_HOST as string;

        const port = parseInt(process.env.EMAIL_PORTA || '');

        const user = process.env.EMAIL_USUARIO as string;

        const pass = process.env.EMAIL_SENHA as string;

        const nomeFuncionarioHtml = funcionario.nome.split(' ', 1);
        const codigo = Math.random().toString(36).slice(2)
        funcionario.codigo = codigo;
        await repository.save({ id: funcionario.id, codigo });


        const remetente = nodemailer.createTransport({
          name: host,
          from: user,
          host,
          port,
          secure: true,
          auth: {
            user,
            pass,

          },
        });

        const emailASerEnviado = {
          from: user,
          to: 'joaooviitorr@hotmail.com',
          subject: 'Atualização de senha via e-mail',
          text: `Informe o codigo na pagina para continuar: ${codigo}`
        };

        remetente.sendMail(emailASerEnviado, function (error, info) {
          if (error) {
            return response.status(500).json({ messagem: 'Erro ao enviar email' })

          } else {
            return response.json(
              {
                id: funcionario.id,
                username: funcionario.cpf,
                email: esconderEmail(funcionario.email)
              }
            )
          }
        });



      }
    } else {
      return response.status(404).json({ messagem: 'CPF não encontrado' });
    }
  },

  async atualizarSenhaEmail(request: Request, response: Response) {
    const { id, senha, codigo } = request.body;
    const repository = getRepository(Funcionario);
    const funcionario = await repository.findOne({ id });

    if (funcionario) {
      if (funcionario.codigo !== codigo) {
        return response.status(500).json({ messagem: 'código incorreto' });
      }
      funcionario.senha = senha;
      funcionario.codigo = null;
      await repository.save(funcionario);
      return response.json({ messagem: 'senha atualizada com sucesso' });

    }

  }
};

const readHTMLFile = (path: string, callback: Function) => {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    }
    else {
      callback(null, html);
    }
  });
};

const esconderEmail = (email: string) => {
  const emailArray = email.split('@');
  let emailMascarado = '';
  for (let i = 0; i < emailArray[0].length; i++) {
    if (i <= 3) {

      emailMascarado += email[i];
    } else {
      emailMascarado += '*';
    }
  }
  emailMascarado += emailArray[1];
  return emailMascarado;
}

