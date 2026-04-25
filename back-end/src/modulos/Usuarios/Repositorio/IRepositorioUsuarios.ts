import { Usuario } from '../Tipagens/TipagemUsuario';

interface IRepositorioUsuarios {
  pesquisarPorId(id: string): Promise<Usuario | null>;
  pesquisarPorNome(nome: string): Promise<Usuario | null>;
  criarUsuario(nome: string, senha: string, permissao: string): Promise<Usuario | null>;
  atualizarUsuario(id: string, nome: string, senha: string, permissao: string): Promise<Usuario | null>;
  apagarUsuario(nome: string): Promise<Usuario | null>;
  pegarUsuarios(): Promise<Usuario[]>;
}

export { IRepositorioUsuarios };
