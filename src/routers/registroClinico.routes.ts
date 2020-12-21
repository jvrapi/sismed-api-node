import { Router } from 'express';
import RegistroClinicoController from '../controllers/RegistroClinicoController';
const Routers = Router();

Routers.get('/', RegistroClinicoController.listarTodos);
Routers.get('/:id', RegistroClinicoController.listarPorId);
Routers.post('/', RegistroClinicoController.salvar);
Routers.put('/', RegistroClinicoController.atualizar);
Routers.delete('/:id', RegistroClinicoController.excluir);
Routers.get('/paciente/:prontuario/medico/:medicoId', RegistroClinicoController.listarPorPaciente);
Routers.get('/data/:data', RegistroClinicoController.listarPorData);
Routers.get('/nome/:nome', RegistroClinicoController.listarPorNome);
Routers.get('/prontuario/:prontuario', RegistroClinicoController.listarPorProntuario);

export default Routers;