import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { IRepositorioUsuarios } from '../Repositorio/IRepositorioUsuarios';

export class CasoDeUsoDeletarUsuario {
  constructor(private repositorioUsuarios: IRepositorioUsuarios) {}

  async executar(id: string) {
    const usuario = await this.repositorioUsuarios.pesquisarPorId(id);

    if (!usuario) {
      throw new EmitirMensagemErro('Usuário não encontrado.');
    }

    return await this.repositorioUsuarios.apagarUsuario(id);
  }
}
