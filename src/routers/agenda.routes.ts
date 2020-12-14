import { Router } from 'express';

import AgendaController from '../controllers/AgendaController';

const Routers = Router();

Routers.get('/:id/', AgendaController.listarTodos);
Routers.get('/:id/:data', AgendaController.listarPorData);
Routers.post('/', AgendaController.agendar);
Routers.put('/', AgendaController.atualizar);
Routers.get('/paciente/ultimoAgendamento/:prontuario', AgendaController.ultimoAgendamento);
Routers.get('/agendamento/detalhes/:id', AgendaController.listarPorId);

export default Routers;
