import { RepositorioUsuarios } from '../Repositorio/RepositorioUsuarios';

class CasoDeUsoBuscarUsuarios {
  constructor(private repositorioUsuarios: RepositorioUsuarios) {}

  async executar(): Promise<{ nome: string; permissao: string }[]> {
    const dadosUsuarios = await this.repositorioUsuarios.buscarUsuarios();
    const users = dadosUsuarios.map(({ id, nome, permissao }) => ({ id, nome, permissao }));

    return users;
  }
}

export { CasoDeUsoBuscarUsuarios };
