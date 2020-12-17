import { Router } from 'express';

import PacienteController from '../controllers/PacienteController';

const Routers = Router();

Routers.get('/', PacienteController.listarTodos);
Routers.get('/:prontuario', PacienteController.detalhes);
Routers.get('/nome/:nome', PacienteController.listarPorNome);
Routers.get('/cpf/:cpf', PacienteController.listarPorCpf);
Routers.get('/celular/:celular', PacienteController.listarPorCelular);
Routers.get('/telefone/:telefone', PacienteController.listarPorTelefone);
Routers.get('/prontuario/:prontuario', PacienteController.listarPorProntuario);
Routers.put('/', PacienteController.atualizar)
Routers.delete('/:prontuario', PacienteController.excluir)
Routers.post('/', PacienteController.salvar)
export default Routers;
