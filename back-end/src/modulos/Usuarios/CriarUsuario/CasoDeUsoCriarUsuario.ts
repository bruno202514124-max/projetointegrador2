import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { validarDados } from '../../../utils/validarDados';
import { RepositorioUsuarios } from '../Repositorio/RepositorioUsuarios';
import { ILogarUsuario } from '../Tipagens/OperacoesDeUsuario';
import { Usuario } from '../Tipagens/TipagemUsuario';
import { ValidacaoCriarUsuario } from '../Validacoes/ValidacaoCriarUsuario';

class CasoDeUsoCriarUsuario {
  constructor(private repositorioUsuarios: RepositorioUsuarios) {}

  async executar({ nome, senha, permissao }: ILogarUsuario): Promise<Usuario> {
    validarDados(ValidacaoCriarUsuario, { nome, senha, permissao });

    const usuarioAntigo = await this.repositorioUsuarios.encontrarPorNome(nome);

    if (usuarioAntigo) {
      throw new EmitirMensagemErro('Já existe um usuário com esse nome.');
    }

    const usuarioNovo = await this.repositorioUsuarios.criarUsuario(nome, senha, permissao);

    if (!usuarioNovo) {
      throw new EmitirMensagemErro('Erro ao criar usuário.');
    }

    return usuarioNovo;
  }
}

export { CasoDeUsoCriarUsuario };
