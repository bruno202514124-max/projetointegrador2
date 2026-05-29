import prisma from '../../../database/prismaClient';
import { CriarItem, Item } from '../Interfaces/InterfaceItens';

class RepositorioItens {
  async criarItem({ nome, preco, bebida }: CriarItem): Promise<Item | null> {
    return await prisma.itens.create({ data: { nome, preco, bebida } });
  }

  async pesquisarPorId(id: string): Promise<Item | null> {
    return await prisma.itens.findUnique({
      where: { id },
    });
  }

  async pesquisarPorNome(texto: string): Promise<Item | null> {
    return await prisma.itens.findFirst({
      where: {
        nome: {
          contains: texto,
        },
      },
    });
  }

  async pesquisarTodos(): Promise<Item[]> {
    const itens = prisma.itens.findMany({
      orderBy: {
        nome: 'asc',
      },
    });
    return itens;
  }

  async atualizarItem({ id, nome, preco, bebida }: Item): Promise<Item | null> {
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
