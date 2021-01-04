import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';

const Routers = Router();

Routers.post('/autenticacao', UsuarioController.autenticacao);
Routers.post('/atualizarSenha', UsuarioController.atualizarSenhaEmail);
Routers.get('/verificarUsuario/:cpf', UsuarioController.verificarUsuario);

export default Routers;
