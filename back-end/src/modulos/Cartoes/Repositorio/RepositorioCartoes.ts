import prisma from '../../../database/prismaClient';
import { Cartao } from '../Interfaces/InterfaceCartoes';

class RepositorioCartoes {
  async criarCartao(numero: string): Promise<Cartao | null> {
    const novoCartao = await prisma.cartoes.create({ data: { numero } });
    return novoCartao;
  }

  async pesquisarPorNumero(numero: string): Promise<Cartao | null> {
    return await prisma.cartoes.findFirst({
      where: {
        numero,
      },
    });
  }
}

export { RepositorioCartoes };
