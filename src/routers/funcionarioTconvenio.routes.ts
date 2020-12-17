import { Router } from 'express';
import FuncionarioTConvenioController from '../controllers/FuncionarioTConvenioController'
const Routers = Router();

Routers.get('/conveniosAceitos/:id', FuncionarioTConvenioController.conveniosAceitos);
Routers.get('/:funcionarioId/tiposAceitos/:convenioId', FuncionarioTConvenioController.tiposConvenioAceitos);
Routers.get('/conveniosNaoAceitos/:id', FuncionarioTConvenioController.conveniosNaoAceitos);
Routers.get('/tiposNaoAceitos/:funcionarioId/:convenioId', FuncionarioTConvenioController.tiposConvenioNaoAceitos);
Routers.post('/', FuncionarioTConvenioController.salvar)
export default Routers;