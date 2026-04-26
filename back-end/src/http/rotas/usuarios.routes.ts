import { Router } from 'express';
import { ControladorAtualizarUsuario } from '../../modulos/Usuarios/AtualizarUsuario/ControladorAtualizarUsuario';
import { ControladorAutenticarUsuario } from '../../modulos/Usuarios/AutenticarUsuario/ControladorAutenticarUsuario';
import { ControladorCriarUsuario } from '../../modulos/Usuarios/CriarUsuario/ControladorCriarusuario';
import { ControladorDeletarUsuario } from '../../modulos/Usuarios/DeletarUsuario/ControladorDeletarUsuario';
import { ControladorPegarUsuarios } from '../../modulos/Usuarios/PegarUsuarios/ControladorPegarUsuarios';
import { autent } from '../middleware/autent';

const controladorPegarUsuarios = new ControladorPegarUsuarios();
const controladorAutenticarUsuario = new ControladorAutenticarUsuario();
const controladorCriarUsuario = new ControladorCriarUsuario();
const controladorAtualizarUsuario = new ControladorAtualizarUsuario();
const controladorDeletarUsuario = new ControladorDeletarUsuario();
const rotasUsuarios = Router();

rotasUsuarios.get('/', autent, controladorPegarUsuarios.iniciar);
rotasUsuarios.post('/login', controladorAutenticarUsuario.iniciar);
rotasUsuarios.post('/criar', autent, controladorCriarUsuario.iniciar);
rotasUsuarios.patch('/atualizar', autent, controladorAtualizarUsuario.iniciar);
rotasUsuarios.delete('/deletar/:id', autent, controladorDeletarUsuario.iniciar);

export { rotasUsuarios };
