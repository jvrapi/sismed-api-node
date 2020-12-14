import { Router } from 'express';

import PacienteController from '../controllers/PacienteController';

const Routers = Router();

Routers.get('/', PacienteController.listarTodos);
Routers.get('/:prontuario', PacienteController.listarPorProntuario);

export default Routers;
