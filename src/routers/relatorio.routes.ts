import { Router } from 'express';
import RelatorioController from '../controllers/RelatorioController';
const Routers = Router();

Routers.post('/', RelatorioController.relatorio);

export default Routers;