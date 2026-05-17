import prisma from '../../../database/prismaClient';
import { CriarPedido, Pedido } from '../Interfaces/InterfacePedido';

class RepositorioPedidos {
  async criarPedido({ cliente, valorFinal, itens }: CriarPedido): Promise<Pedido | null> {
    const novoPedido = await prisma.pedidos.create({
      data: {
        cliente,
        valorFinal,
        itens: {
          connect: itens.map(item => ({ id: item.id })),
        },
      },
    });

    const retornoNovoPedido = prisma.pedidos.findUnique({
      where: { id: novoPedido.id },
      include: { itens: true },
    });

    return retornoNovoPedido;
  }
}

export { RepositorioPedidos };
