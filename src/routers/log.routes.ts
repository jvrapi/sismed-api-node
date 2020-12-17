import { Router } from 'express';
import LogController from '../controllers/LogController';

const Routers = Router();

Routers.post('/', LogController.salvar)

export default Routers;