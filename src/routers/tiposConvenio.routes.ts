import { Router } from 'express';
import TipoConvenioController from '../controllers/TipoConvenioController';

const Routers = Router();

Routers.get('/:id', TipoConvenioController.listarPorConvenio);
Routers.get('/detalhes/:id', TipoConvenioController.listarPorId);
Routers.get('/nome/:nome/convenio/:convenioId', TipoConvenioController.listarPorNome);
Routers.post('/', TipoConvenioController.cadastrar);
Routers.put('/', TipoConvenioController.atualizar);
Routers.delete('/:id', TipoConvenioController.excluir);

export default Routers;