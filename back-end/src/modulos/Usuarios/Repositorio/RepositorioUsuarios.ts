import prisma from '../../../database/prismaClient';
import { Usuario } from '../Tipagens/TipagemUsuario';
import { IRepositorioUsuarios } from './IRepositorioUsuarios';

class RepositorioUsuarios implements IRepositorioUsuarios {
  async pesquisarPorId(id: string): Promise<Usuario | null> {
    return await prisma.usuario.findUnique({
      where: { id },
    });
  }

  async pesquisarPorNome(nome: string): Promise<Usuario | null> {
    return await prisma.usuario.findFirst({
      where: { nome },
    });
  }

  async criarUsuario(nome: string, senha: string, permissao: string): Promise<Usuario | null> {
    return await prisma.usuario.create({ data: { nome, senha, permissao } });
  }

  async apagarUsuario(id: string): Promise<Usuario | null> {
    return await prisma.usuario.delete({
      where: {
        id,
      },
    });
  }

  async atualizarUsuario(
    id: string,
    nome: string,
    senha: string,
    permissao: string
  ): Promise<Usuario | null> {
    return await prisma.usuario.update({
      where: {
        id,
      },
      data: {
        nome,
        senha,
        permissao,
      },
    });
  }

  async pegarUsuarios(): Promise<Usuario[]> {
    const usuario = prisma.usuario.findMany({
      orderBy: {
        nome: 'asc',
      },
    });

    return usuario;
  }
}

export { RepositorioUsuarios };
