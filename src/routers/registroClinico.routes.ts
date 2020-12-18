import { Router } from 'express';
import RegistroClinicoController from '../controllers/RegistroClinicoController';
const Routers = Router();

Routers.get('/', RegistroClinicoController.listarTodos);
Routers.post('/', RegistroClinicoController.salvar);

export default Routers;