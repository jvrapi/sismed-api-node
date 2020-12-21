import { Router } from 'express';
import RegistroClinicoController from '../controllers/RegistroClinicoController';
const Routers = Router();

Routers.get('/', RegistroClinicoController.listarTodos);
Routers.post('/', RegistroClinicoController.salvar);
Routers.get('/paciente/:prontuario/medico/:medicoId', RegistroClinicoController.listarPorPaciente);

export default Routers;