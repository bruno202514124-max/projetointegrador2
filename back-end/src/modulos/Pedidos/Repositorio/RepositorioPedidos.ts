import prisma from '../../../database/prismaClient';
import { CriarPedido, PedidoComItens } from '../Interfaces/InterfacePedido';

class RepositorioPedidos {
  async criarPedido({ cliente, itens, idCartao, pessoas }: CriarPedido): Promise<PedidoComItens | null> {
    const novoPedido = await prisma.pedidos.create({
      data: {
        cliente,
        pessoas,
        cartao: { connect: { id: idCartao } },
      },
    });

    const idsItens = itens.map(item => item.id);

    const itensDoBanco = await prisma.itens.findMany({
      where: {
        id: {
          in: idsItens,
        },
      },
    });

    const dadosPedidoItem = itens.map((item, i) => ({
      itemId: item.id,
      pedidoId: novoPedido.id,
      qtdItem: item.qtd,
      valorItem: itensDoBanco[i].preco,
    }));

    const novoPedidoitem = await prisma.pedidosItens.createMany({
      data: dadosPedidoItem,
    });

    const pedidoComItens = await prisma.pedidos.findUnique({
      where: { id: novoPedido.id },
      include: {
        itens: true,
      },
    });

    return pedidoComItens;
  }

  async trazerPedidos(): Promise<PedidoComItens[] | null> {
    const pedidoComItens = await prisma.pedidos.findMany({
      include: {
        itens: true,
      },
    });

    return pedidoComItens;
  }
}

export { RepositorioPedidos };
