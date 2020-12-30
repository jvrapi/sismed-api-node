import { Request, Response } from 'express';
const { exec } = require('child_process');
import path from 'path';
import { data } from '../functions';

interface Resposta {
  tabela: string;
  erro: boolean;
}

export default {
  async backup(request: Request, response: Response) {

    const tabelas = request.body;

    exec(`mkdir ${path.join(__dirname, '..', 'backups', `${data()}`)}`);


    tabelas.forEach((tabela: string) => {
      const dumpFile = path.join(__dirname, '..', 'backups', data(), `${tabela}.sql`);

      exec(`mysqldump -u${process.env.MYSQL_USER} -p${process.env.MYSQL_PASSWORD} -h${process.env.MYSQL_HOST} ${process.env.MYSQL_DATABASE} ${tabela} > ${dumpFile}`);

    });

    response.json({});

  }


}