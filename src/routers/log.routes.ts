import { Router } from 'express';
import LogController from '../controllers/LogController';;

const Routers = Router();

Routers.get('/', LogController.listarTodos)

export default Routers;
