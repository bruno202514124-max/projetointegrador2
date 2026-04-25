import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { validarDados } from '../../../utils/validarDados';
import { IRepositorioUsuarios } from '../Repositorio/IRepositorioUsuarios';
import { IAtualizarUsuario } from '../Tipagens/OperacoesDeUsuario';
import { Usuario } from '../Tipagens/TipagemUsuario';
import { ValidacaoCriarUsuario } from '../Validacoes/ValidacaoCriarUsuario';

class CasoDeUsoAtualizarUsuario {
  constructor(private repositorioUsuarios: IRepositorioUsuarios) {}

  async executar({ id, nome, senha, permissao }: IAtualizarUsuario): Promise<Usuario> {
    const usuario = await this.repositorioUsuarios.pesquisarPorId(id);
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
      throw new EmitirMensagemErro('Usuário não existe.');
    }

    return usuarioAtualizado;
  }
}

export { CasoDeUsoAtualizarUsuario };
