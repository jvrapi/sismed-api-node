import { Router } from 'express';
import ProcedimentoController from '../controllers/ProcedimentoController';

const Routers = Router();

Routers.get('/:convenioId', ProcedimentoController.listPorConvenio);
Routers.get('/desc/:descricao/convenio/:convenioId', ProcedimentoController.listPorDescricao);
Routers.get('/detalhes/:id', ProcedimentoController.listarPorId);
Routers.post('/', ProcedimentoController.cadastrar);
Routers.put('/', ProcedimentoController.atualizar);
Routers.delete('/:id', ProcedimentoController.excluir);

export default Routers;
