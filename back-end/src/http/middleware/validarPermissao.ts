import { NextFunction, Request, Response } from 'express';
import { EmitirMensagemErro } from '../../erros/EmitirMensagemErro';
import { RepositorioUsuarios } from '../../modulos/Usuarios/Repositorio/RepositorioUsuarios';

interface TokenUsuario {
  id: string;
  permissao: string;
}

export type Permissoes = 'Frente' | 'Retaguarda' | 'Administrador';

export function validarPermissao(permissoes: Permissoes[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuario = req.usuario satisfies TokenUsuario;

      if (!usuario) {
        throw new EmitirMensagemErro('Usuário não autenticado!', 401);
      }

      const temPermisso = await conferirPermissao(usuario, permissoes);

      if (!temPermisso) {
        throw new EmitirMensagemErro('Usuário não possui permissão necessária!', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

async function conferirPermissao(usuario: TokenUsuario, permissoes: Permissoes[]): Promise<boolean> {
  if (!permissoes.includes(usuario.permissao as Permissoes)) {
    return false;
  }

  const verificarPermissao = {
    Frente: () => buscarPermissao(usuario.id, 'Frente'),
    Retaguarda: () => buscarPermissao(usuario.id, 'Retaguarda'),
    Administrador: () => buscarPermissao(usuario.id, 'Administrador'),
  };

  const validarPermissao = verificarPermissao[usuario.permissao as Permissoes];

  return validarPermissao ? validarPermissao() : false;
}

async function buscarPermissao(id: string, permissao: Permissoes) {
  const repositorioUsuarios = new RepositorioUsuarios();
  const permissaoUsuarioExistente = (await repositorioUsuarios.pesquisarPorId(id))?.permissao;

  return permissaoUsuarioExistente ? permissaoUsuarioExistente == permissao : false;
}
