import { RepositorioUsuarios } from '../Repositorio/RepositorioUsuarios';

class CasoDeUsoPegarUsuarios {
  constructor(private repositorioUsuarios: RepositorioUsuarios) {}

  async executar(): Promise<{ nome: string; permissao: string }[]> {
    const dadosUsuarios = await this.repositorioUsuarios.pegarUsuarios();
    const users = dadosUsuarios.map(({ id, nome, permissao }) => ({ id, nome, permissao }));

    return users;
  }
}

export { CasoDeUsoPegarUsuarios };
