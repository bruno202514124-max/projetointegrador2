import { Request, Response } from 'express';
import { RepositorioUsuarios } from '../Repositorio/RepositorioUsuarios';
import { CasoDeUsoDeletarUsuario } from './CasoDeUsoDeletarUsuario';

class ControladorDeletarUsuario {
  async iniciar(req: Request, res: Response): Promise<Response> {
    const reqId = req.params.id;
    let id = '';

    if (Array.isArray(reqId)) {
      id = reqId[reqId.length - 1];
    } else {
      id = reqId;
    }

    const repositorioUsuarios = new RepositorioUsuarios();
    const casoDeUsoDeletarUsuario = new CasoDeUsoDeletarUsuario(repositorioUsuarios);

    try {
      await casoDeUsoDeletarUsuario.executar(id);
      return res.json('Usuário deletado.');
    } catch (err) {
      return res.json(err);
    }
  }
}

export { ControladorDeletarUsuario };
