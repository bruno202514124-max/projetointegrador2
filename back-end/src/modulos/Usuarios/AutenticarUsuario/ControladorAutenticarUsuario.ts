import { Request, Response } from 'express';
import { tratarErro } from '../../../erros/TratarErro';
import { RepositorioUsuarios } from '../Repositorio/RepositorioUsuarios';
import { CasoDeUsoAutenticarUsuario } from './CasoDeUsoAutenticarUsuario';

class ControladorAutenticarUsuario {
  async iniciar(req: Request, res: Response): Promise<Response> {
    const { nome, senha } = req.body;

    const repositorioUsuarios = new RepositorioUsuarios();
    const casoDeUsoAutenticarUsuario = new CasoDeUsoAutenticarUsuario(repositorioUsuarios);

    try {
      const resultadoLogin = await casoDeUsoAutenticarUsuario.executar({
        nome,
        senha,
      });

      // 🌟 DEVOLVE TUDO (Autenticação, Token e Permissão)
      return res.json(resultadoLogin);
    } catch (err) {
      const resposta = tratarErro({ res, err });
      return resposta;
    }
  }
}

export { ControladorAutenticarUsuario };