import { Router } from 'express';
import ExameController from '../controllers/ExameController'

const Routers = Router();

Routers.get('/', ExameController.listarTodos);
Routers.get('/:id', ExameController.listarPorId);
Routers.get('/pesquisa/composta', ExameController.pesquisa)
Routers.post('/', ExameController.salvar);
Routers.put('/', ExameController.atualizar);
Routers.delete('/:id', ExameController.excluir)

export default Routers;