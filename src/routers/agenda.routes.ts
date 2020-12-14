import { Router } from 'express';

import AgendaController from '../controllers/AgendaController';

const Routers = Router();

Routers.get('/:id/', AgendaController.listarTodos);
Routers.get('/:id/:data', AgendaController.listarPorData);
Routers.post('/', AgendaController.agendar);
Routers.get('/paciente/ultimoAgendamento/:prontuario', AgendaController.ultimoAgendamento);

export default Routers;
