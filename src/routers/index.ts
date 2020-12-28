import { Router } from 'express';
import AutenticacaoMiddleware from '../middlewares/AutenticacaoMiddleware';
import PacienteRotas from './paciente.routes';
import AgendaRotas from './agenda.routes';
import FuncionarioRotas from './funcionario.routes';
import ProcedimentoRotas from './procedimentos.routes';
import RegistroClinicoRotas from './registroClinico.routes';
import RelatorioRotas from './relatorio.routes';
import ConvenioRotas from './convenios.routes';
import TipoConvenioRotas from './tiposConvenio.routes';
import FuncionarioTConvenioRotas from './funcionarioTconvenio.routes';
import LaboratorioTConvenioRotas from './laboratorioTconvenio.routes';

import LaboratorioRotas from './laboratorio.routes';
import ExameRotas from './exame.routes';
import UserController from '../controllers/UserController';

const Routers = Router();

Routers.post('/autenticacao', UserController.autenticacao);
Routers.use('/paciente', AutenticacaoMiddleware, PacienteRotas);
Routers.use('/agenda', AutenticacaoMiddleware, AgendaRotas);
Routers.use('/funcionario', AutenticacaoMiddleware, FuncionarioRotas);
Routers.use('/procedimento', AutenticacaoMiddleware, ProcedimentoRotas);
Routers.use('/registroClinico', AutenticacaoMiddleware, RegistroClinicoRotas);
Routers.use('/convenio', AutenticacaoMiddleware, ConvenioRotas);
Routers.use('/tiposConvenio', AutenticacaoMiddleware, TipoConvenioRotas);
Routers.use('/funcionarioTconvenio', AutenticacaoMiddleware, FuncionarioTConvenioRotas);
Routers.use('/laboratorioTconvenio', AutenticacaoMiddleware, LaboratorioTConvenioRotas);
Routers.use('/relatorio', AutenticacaoMiddleware, RelatorioRotas);
Routers.use('/laboratorio', AutenticacaoMiddleware, LaboratorioRotas);
Routers.use('/exame', AutenticacaoMiddleware, ExameRotas);



export default Routers;
