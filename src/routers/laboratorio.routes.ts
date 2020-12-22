import { Router } from 'express';
import LaboratorioController from '../controllers/LaboratorioController';

const Routers = Router();

Routers.get('/', LaboratorioController.listarTodos);
Routers.get('/:id', LaboratorioController.listarPorId);
Routers.get('/nome/:nome', LaboratorioController.listarPorNome);
Routers.get('/telefone/:telefone', LaboratorioController.listarPorTelefone);
Routers.get('/bairro/:bairro', LaboratorioController.listarPorBairro);
Routers.post('/', LaboratorioController.salvar);
Routers.put('/', LaboratorioController.atualizar);
Routers.delete('/:id', LaboratorioController.excluir);


export default Routers;