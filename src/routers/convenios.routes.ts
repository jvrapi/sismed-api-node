import { Router } from 'express';
import ConvenioController from '../controllers/ConvenioController';

const Routers = Router();

Routers.get('/', ConvenioController.listarTodos);
Routers.get('/:id', ConvenioController.listarPorId);
Routers.get('/nome/:nome', ConvenioController.listarPorNome);
Routers.get('/ans/:ans', ConvenioController.listarPorAns);
Routers.get('/cnpj/:cnpj', ConvenioController.listarPorCnpj);
Routers.post('/', ConvenioController.cadastrar);
Routers.put('/', ConvenioController.atualizar);
Routers.delete('/:id', ConvenioController.excluir);

export default Routers;