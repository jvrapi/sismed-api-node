import { Request, Response } from 'express';
const { exec } = require('child_process');
import path from 'path';

export default {
  async restaurar(request: Request, response: Response) {
    const { tabelas, data } = request.body;

    tabelas.forEach((tabela: string) => {
      const dumpFile = path.join(__dirname, '..', 'backups', data, `${tabela}.sql`);

      exec(`mysql -u${process.env.MYSQL_USUARIO} -p${process.env.MYSQL_SENHA} -h${process.env.MYSQL_HOST} ${process.env.MYSQL_BANCO} < ${dumpFile}`);
    });
    return response.json({})

  }
}
