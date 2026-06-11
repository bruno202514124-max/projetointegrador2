import prisma from '../../../database/prismaClient';
import { Cartao } from '../Interfaces/InterfaceCartoes';

class RepositorioCartoes {
  async criarCartao(numero: string): Promise<Cartao | null> {
    const novoCartao = await prisma.cartoes.create({ data: { numero } });
    return novoCartao;
  }

  async pesquisarPorId(id: string): Promise<Cartao | null> {
    return await prisma.cartoes.findUnique({
      where: { id },
    });
  }

  async pesquisarPorNumero(numero: string): Promise<Cartao | null> {
    return await prisma.cartoes.findFirst({
      where: {
        numero,
      },
    });
  }

  async buscarTodos(): Promise<Cartao[]> {
    const cartoes = await prisma.cartoes.findMany();
    const cartoesOrdenados = cartoes.sort((a, b) => parseInt(a.numero) - parseInt(b.numero));
    return cartoesOrdenados;
  }

  async atualizarCartao({ id, numero }: Cartao): Promise<Cartao | null> {
    return await prisma.cartoes.update({
      where: {
        id,
      },
      data: {
        numero,
      },
    });
  }

  async apagarCartao(id: string): Promise<Cartao | null> {
    return await prisma.cartoes.delete({
      where: {
        id,
      },
    });
  }
}

export { RepositorioCartoes };
