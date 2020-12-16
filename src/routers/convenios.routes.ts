import { Router } from 'express';
import ConvenioController from '../controllers/ConvenioController';

const Routers = Router();

Routers.get('/', ConvenioController.listarTodos);

export default Routers;