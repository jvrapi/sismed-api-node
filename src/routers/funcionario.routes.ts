import { Router } from 'express';

import FuncionarioController from '../controllers/FuncionarioController';

const Routers = Router();
Routers.get('/', FuncionarioController.listarTodos);
Routers.get('/:id', FuncionarioController.listarPorId);
Routers.get('/medicos', FuncionarioController.medicos);
Routers.get('/conveniosAceitos/:id', FuncionarioController.conveniosAceitos);
Routers.get('/:funcionarioId/tiposAceitos/:convenioId', FuncionarioController.tiposConvenioAceitos);
Routers.get('/nome/:nome', FuncionarioController.listarPorNome);
Routers.get('/cpf/:cpf', FuncionarioController.listarPorCpf);
Routers.get('/crm/:crm', FuncionarioController.listarPorCrm);
Routers.get('/celular/:celular', FuncionarioController.listarPorCelular);
Routers.get('/matricula/:id', FuncionarioController.listarPorMatricula);
Routers.get('/especialidade/:especialidade', FuncionarioController.listarPorEspecialidade);
Routers.put('/', FuncionarioController.atualizar);
export default Routers;
