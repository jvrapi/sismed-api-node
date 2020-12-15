import { Router } from 'express';
import RelatorioController from '../controllers/RelatorioController';
const Routers = Router();

Routers.post('/', RelatorioController.salvar);

export default Routers;