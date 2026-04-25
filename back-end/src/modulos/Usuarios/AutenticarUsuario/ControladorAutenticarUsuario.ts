import { Request, Response } from 'express';
import { RepositorioUsuarios } from '../Repositorio/RepositorioUsuarios';
import { CasoDeUsoAutenticarUsuario } from './CasoDeUsoAutenticarUsuario';

class ControladorAutenticarUsuario {
  async iniciar(req: Request, res: Response): Promise<Response> {
    const { nome, senha } = req.body;

    const repositorioUsuarios = new RepositorioUsuarios();
    const casoDeUsoAutenticarUsuario = new CasoDeUsoAutenticarUsuario(repositorioUsuarios);

    try {
      const token = await casoDeUsoAutenticarUsuario.executar({
        nome,
        senha,
      });

      return res.json(token);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { ControladorAutenticarUsuario };
