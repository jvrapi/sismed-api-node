import { Router } from 'express';
import LaboratorioTConvenioController from '../controllers/LaboratorioTConvenioController'

const Routers = Router();

Routers.get('/conveniosAceitos/:laboratorioId', LaboratorioTConvenioController.listarConveniosAceitos);
Routers.get('/conveniosNaoAceitos/:laboratorioId', LaboratorioTConvenioController.listarConveniosNaoAceitos);
Routers.get('/:laboratorioId/:convenioId', LaboratorioTConvenioController.listarTiposAceitos);
Routers.get('/:laboratorioId/tiposNaoAceitos/:convenioId', LaboratorioTConvenioController.listarTiposNaoAceitos);
Routers.get('/tiposAceitos/todos/:laboratorioId', LaboratorioTConvenioController.listarTodosOsTipos);
Routers.post('/', LaboratorioTConvenioController.salvar);
Routers.delete('/', LaboratorioTConvenioController.excluir);

export default Routers;