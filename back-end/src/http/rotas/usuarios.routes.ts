import { Router } from 'express';
import { ControladorAtualizarUsuario } from '../../modulos/Usuarios/AtualizarUsuario/ControladorAtualizarUsuario';
import { ControladorAutenticarUsuario } from '../../modulos/Usuarios/AutenticarUsuario/ControladorAutenticarUsuario';
import { ControladorBuscarUsuarios } from '../../modulos/Usuarios/BuscarUsuarios/ControladorBuscarUsuarios';
import { ControladorCriarUsuario } from '../../modulos/Usuarios/CriarUsuario/ControladorCriarusuario';
import { ControladorDeletarUsuario } from '../../modulos/Usuarios/DeletarUsuario/ControladorDeletarUsuario';
import { autenticar } from '../middleware/autenticar';
import { validarAutenticacao } from '../middleware/validarAutenticacao';
import { validarPermissao } from '../middleware/validarPermissao';

const controladorBuscarUsuarios = new ControladorBuscarUsuarios();
const controladorAutenticarUsuario = new ControladorAutenticarUsuario();
const controladorCriarUsuario = new ControladorCriarUsuario();
const controladorAtualizarUsuario = new ControladorAtualizarUsuario();
const controladorDeletarUsuario = new ControladorDeletarUsuario();
const rotasUsuarios = Router();

rotasUsuarios.get(
  '/',
  autenticar,
  validarAutenticacao,
  validarPermissao(['Administrador']),
  controladorBuscarUsuarios.iniciar
);

rotasUsuarios.post('/login', controladorAutenticarUsuario.iniciar);

rotasUsuarios.post(
  '/criar',
  autenticar,
  validarAutenticacao,
  validarPermissao(['Administrador']),
  controladorCriarUsuario.iniciar
);

rotasUsuarios.patch(
  '/atualizar',
  autenticar,
  validarAutenticacao,
  validarPermissao(['Administrador']),
  controladorAtualizarUsuario.iniciar
);

rotasUsuarios.delete(
  '/deletar/:id',
  autenticar,
  validarAutenticacao,
  validarPermissao(['Administrador']),
  controladorDeletarUsuario.iniciar
);

export { rotasUsuarios };
