import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { validarDados } from '../../../utils/validarDados';
import { ValidacaoId } from '../../ValidacaoId';
import { Usuario } from '../Interfaces/InterfaceUsuario';
import { IAtualizarUsuario } from '../Interfaces/OperacoesDeUsuario';
import { IRepositorioUsuarios } from '../Repositorio/IRepositorioUsuarios';
import { ValidacaoCriarUsuario } from '../Validacoes/ValidacaoCriarUsuario';

class CasoDeUsoAtualizarUsuario {
  constructor(private repositorioUsuarios: IRepositorioUsuarios) {}

  async executar({ id, nome, senha, permissao }: IAtualizarUsuario): Promise<Usuario> {
    validarDados(ValidacaoId, { id });

    const usuario = await this.repositorioUsuarios.pesquisarPorId(id);

    if (!usuario) {
      throw new EmitirMensagemErro('Usuário não existe.', 400);
    }

    let usuarioAtualizado: Usuario | null = null;

    if (usuario) {
      let novoNome = nome;
      let novaSenha = senha;
      let novaPerm = permissao;

      if (!novoNome) {
        novoNome = usuario?.nome;
      }
      if (!novaSenha) {
        novaSenha = usuario?.senha;
      }
      if (!novaPerm) {
        novaPerm = usuario?.permissao;
      }

      validarDados(ValidacaoCriarUsuario, { nome: novoNome, senha: novaSenha, permissao: novaPerm });

      usuarioAtualizado = await this.repositorioUsuarios.atualizarUsuario(
        id,
        novoNome,
        novaSenha,
        novaPerm
      );
    }

    if (!usuarioAtualizado) {
      throw new EmitirMensagemErro('Usuário não existe.', 400);
    }

    return usuarioAtualizado;
  }
}

export { CasoDeUsoAtualizarUsuario };
