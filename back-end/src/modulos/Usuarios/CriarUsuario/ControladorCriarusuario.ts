import { Request, Response } from 'express';
import { tratarErro } from '../../../erros/TratarErro';
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

      return res.status(201).json(novoUsuario);
    } catch (err) {
      const resposta = tratarErro({ res, err });
      return resposta;
    }
  }
}

export { ControladorCriarUsuario };
