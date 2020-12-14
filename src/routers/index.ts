import { Router } from 'express';
import AutenticacaoMiddleware from '../middlewares/AutenticacaoMiddleware';
import PacienteRotas from './paciente.routes';
import AgendaRotas from './agenda.routes';
import FuncionarioRotas from './funcionario.routes';
import ProcedimentoRotas from './procedimentos.routes';
import UserController from '../controllers/UserController';

const Routers = Router();

Routers.post('/autenticacao', UserController.autenticacao);
Routers.use('/paciente', AutenticacaoMiddleware, PacienteRotas);
Routers.use('/agenda', AutenticacaoMiddleware, AgendaRotas);
Routers.use('/funcionario', AutenticacaoMiddleware, FuncionarioRotas);
Routers.use('/procedimento', AutenticacaoMiddleware, ProcedimentoRotas);

export default Routers;
