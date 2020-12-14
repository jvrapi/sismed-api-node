import { Router } from 'express';
import ProcedimentoController from '../controllers/ProcedimentoController';

const Routers = Router();

Routers.get('/:convenioId', ProcedimentoController.listPorConvenio);

export default Routers;
