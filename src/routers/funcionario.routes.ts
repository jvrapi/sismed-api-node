import { Router } from 'express';

import FuncionarioController from '../controllers/FuncionarioController';

const Routers = Router();
Routers.get('/', FuncionarioController.listarTodos);
Routers.get('/:id', FuncionarioController.listarPorId);
Routers.get('/listar/medicos', FuncionarioController.medicos);
Routers.get('/nome/:nome', FuncionarioController.listarPorNome);
Routers.get('/cpf/:cpf', FuncionarioController.listarPorCpf);
Routers.get('/crm/:crm', FuncionarioController.listarPorCrm);
Routers.get('/celular/:celular', FuncionarioController.listarPorCelular);
Routers.get('/matricula/:id', FuncionarioController.listarPorMatricula);
Routers.get('/especialidade/:especialidade', FuncionarioController.listarPorEspecialidade);
Routers.put('/', FuncionarioController.atualizar);
Routers.delete('/:id', FuncionarioController.excluir);
Routers.post('/atualizarSenha', FuncionarioController.atualizarSenha);
Routers.post('/', FuncionarioController.salvar);
export default Routers;
