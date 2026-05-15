import prisma from '../../../database/prismaClient';
import { Item } from '../../Usuarios/Tipagens/TipagemItens';

class RepositorioItens {
  async criarItem(nome: string, preco: number, bebida: boolean): Promise<Item | null> {
    return await prisma.itens.create({ data: { nome, preco, bebida } });
  }

  async pesquisarPorId(id: string): Promise<Item | null> {
    return await prisma.itens.findUnique({
      where: { id },
    });
  }

  async pesquisarPorNome(nome: string): Promise<Item | null> {
    return await prisma.itens.findFirst({
      where: { nome },
    });
  }

  async pesquisarItens(): Promise<Item[]> {
    const itens = prisma.itens.findMany({
      orderBy: {
        nome: 'asc',
      },
    });
    return itens;
  }

  async atualizarItem(id: string, nome: string, preco: number, bebida: boolean): Promise<Item | null> {
    return await prisma.itens.update({
      where: {
        id,
      },
      data: {
        nome,
        preco,
        bebida,
      },
    });
  }

  async apagarItem(id: string): Promise<Item | null> {
    return await prisma.itens.delete({
      where: {
        id,
      },
    });
  }
}

export { RepositorioItens };
