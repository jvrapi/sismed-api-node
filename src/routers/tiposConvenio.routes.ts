import { Router } from 'express';
import TipoConvenioController from '../controllers/TipoConvenioController';

const Routers = Router();

Routers.get('/:id', TipoConvenioController.listarPorConvenio)

export default Routers;