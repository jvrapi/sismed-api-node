import { Router } from 'express';

import FuncionarioController from '../controllers/FuncionarioController';

const Routers = Router();
Routers.get('/', FuncionarioController.listarTodos);
Routers.get('/detalhes/:id', FuncionarioController.listarPorId);
Routers.get('/medicos', FuncionarioController.medicos);
Routers.get('/conveniosAceitos/:id', FuncionarioController.conveniosAceitos);
Routers.get('/:funcionarioId/tiposAceitos/:convenioId', FuncionarioController.tiposConvenioAceitos);
export default Routers;
