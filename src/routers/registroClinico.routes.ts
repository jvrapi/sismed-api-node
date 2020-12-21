import { Router } from 'express';
import RegistroClinicoController from '../controllers/RegistroClinicoController';
const Routers = Router();

Routers.get('/', RegistroClinicoController.listarTodos);
Routers.post('/', RegistroClinicoController.salvar);
Routers.get('/paciente/:prontuario/medico/:medicoId', RegistroClinicoController.listarPorPaciente);
Routers.get('/data/:data', RegistroClinicoController.listarPorData);
Routers.get('/nome/:nome', RegistroClinicoController.listarPorNome);
Routers.get('/prontuario/:prontuario', RegistroClinicoController.listarPorProntuario);

export default Routers;