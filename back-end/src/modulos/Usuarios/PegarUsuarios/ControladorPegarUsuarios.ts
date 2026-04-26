import { Request, Response } from 'express';
import { RepositorioUsuarios } from '../Repositorio/RepositorioUsuarios';
import { CasoDeUsoPegarUsuarios } from './CasoDeUsoPegarUsuarios';

class ControladorPegarUsuarios {
  async iniciar(req: Request, res: Response): Promise<Response> {
    const repositorioUsuarios = new RepositorioUsuarios();
    const casoDeUsoPegarUsuarios = new CasoDeUsoPegarUsuarios(repositorioUsuarios);

    try {
      const usuarios = await casoDeUsoPegarUsuarios.executar();
      return res.status(201).json(usuarios);
    } catch (err) {
      return res.json(err);
    }
  }
}

export { ControladorPegarUsuarios };
