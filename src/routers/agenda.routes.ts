import { Router } from 'express';

import AgendaController from '../controllers/AgendaController';

const Routers = Router();

Routers.get('/:id/', AgendaController.listarTodos);
Routers.get('/:id/:data', AgendaController.listarPorData);
Routers.post('/', AgendaController.agendar);
Routers.put('/', AgendaController.atualizar);
Routers.get('/paciente/ultimoAgendamento/:prontuario', AgendaController.ultimoAgendamento);
Routers.get('/agendamento/detalhes/:id', AgendaController.listarPorId);
Routers.get('/agendamentos/anteriores/:id', AgendaController.agendamentosAnteriores);
Routers.delete('/:id', AgendaController.excluir);

export default Routers;
