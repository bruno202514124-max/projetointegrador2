import { Request, Response } from 'express';
import { RepositorioUsuarios } from '../Repositorio/RepositorioUsuarios';
import { CasoDeUsoAtualizarUsuario } from './CasoDeUsoAtualizarUsuario';

class ControladorAtualizarUsuario {
  async iniciar(req: Request, res: Response): Promise<Response> {
    const { id, nome, senha, permissao } = req.body;

    const repositorioUsuarios = new RepositorioUsuarios();
    const casoDeUsoAtualizarUsuario = new CasoDeUsoAtualizarUsuario(repositorioUsuarios);

    try {
      const usuarioAtualizado = await casoDeUsoAtualizarUsuario.executar({
        id,
        nome,
        senha,
        permissao,
      });

      return res.json(usuarioAtualizado);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { ControladorAtualizarUsuario };
