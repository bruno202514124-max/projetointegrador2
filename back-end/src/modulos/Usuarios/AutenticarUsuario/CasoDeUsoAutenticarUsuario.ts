import jwt from 'jsonwebtoken';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { SECRET_KEY } from '../../../http/middleware/autent';
import { validarDados } from '../../../utils/validarDados';
import { RepositorioUsuarios } from '../Repositorio/RepositorioUsuarios';
import { ValidacaoLogarUsuario } from '../Validacoes/ValidacaoLogarUsuario';

interface IReq {
  nome: string;
  senha: string;
}

interface IResp {
  autent: boolean;
  token: string;
  usuario: {
    nome: string;
    permissao: string;
  };
}

class CasoDeUsoAutenticarUsuario {
  constructor(private repositorioUsuarios: RepositorioUsuarios) {}

  async executar({ nome, senha }: IReq): Promise<IResp> {
    validarDados(ValidacaoLogarUsuario, { nome, senha });

    const usuario = await this.repositorioUsuarios.pesquisarPorNome(nome);

    if (!usuario || usuario.senha !== senha) {
      throw new EmitirMensagemErro('Usuário ou senha inválidos');
    }

    const token = jwt.sign({ id: usuario.nome.toString() }, SECRET_KEY, {
      expiresIn: '1h',
    });

    // 🌟 AGORA ENVIAMOS A PERMISSÃO PARA O FRONT-END!
    const response: IResp = { 
      autent: true, 
      token: token,
      usuario: {
        nome: usuario.nome.toString(),
        permissao: usuario.permissao 
      }
    };

    return response;
  }
}

export { CasoDeUsoAutenticarUsuario };