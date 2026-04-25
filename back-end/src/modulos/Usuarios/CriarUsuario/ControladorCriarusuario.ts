import { Request, Response } from 'express';
import { RepositorioUsuarios } from '../Repositorio/RepositorioUsuarios';
import { CasoDeUsoCriarUsuario } from './CasoDeUsoCriarUsuario';

class ControladorCriarUsuario {
  async iniciar(req: Request, res: Response): Promise<Response> {
    const { nome, senha, permissao } = req.body;

    const repositorioUsuarios = new RepositorioUsuarios();
    const casoDeUsoCriarUsuario = new CasoDeUsoCriarUsuario(repositorioUsuarios);

    try {
      const novoUsuario = await casoDeUsoCriarUsuario.executar({
        nome,
        senha,
        permissao,
      });

      return res.json(novoUsuario);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { ControladorCriarUsuario };
