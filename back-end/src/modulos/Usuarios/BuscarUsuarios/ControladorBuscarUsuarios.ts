import { Request, Response } from 'express';
import { tratarErro } from '../../../erros/TratarErro';
import { RepositorioUsuarios } from '../Repositorio/RepositorioUsuarios';
import { CasoDeUsoBuscarUsuarios } from './CasoDeUsoBuscarUsuarios';

class ControladorBuscarUsuarios {
  async iniciar(req: Request, res: Response): Promise<Response> {
    const repositorioUsuarios = new RepositorioUsuarios();
    const casoDeUsoBuscarUsuarios = new CasoDeUsoBuscarUsuarios(repositorioUsuarios);

    try {
      const usuarios = await casoDeUsoBuscarUsuarios.executar();
      return res.status(200).json(usuarios);
    } catch (err) {
      const resposta = tratarErro({ res, err });
      return resposta;
    }
  }
}

export { ControladorBuscarUsuarios };
