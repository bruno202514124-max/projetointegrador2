import prisma from '../../../database/prismaClient';
import {
  CriarPedido,
  PedidoComItens,
  PedidoSemItens,
  RelatorioPedidos,
} from '../Interfaces/InterfacePedido';

class RepositorioPedidos {
  async criarPedido({
    idMesa,
    idCartao,
    cliente,
    pessoas,
    itens,
  }: CriarPedido): Promise<PedidoComItens | null> {
    const novoPedido = await prisma.pedidos.create({
      data: {
        cliente,
        pessoas,
        cartao: { connect: { id: idCartao } },
      },
    });

    const idsItensRecebidos = itens.map(item => item.id).reverse();

    const itensDoBanco = await prisma.itens.findMany({
      where: {
        id: {
          in: idsItensRecebidos,
        },
      },
    });

    const dadosPedidoItem = itens
      .map(item => ({
        ...item,
        ...itensDoBanco.find(itemDB => itemDB.id == item.id),
      }))
      .map(dadosItem => ({
        itemId: dadosItem.id,
        pedidoId: novoPedido.id,
        qtdItem: dadosItem.qtd,
        valorItem: dadosItem.preco!,
      }));

    await prisma.cartoes.update({
      where: {
        id: idCartao,
      },
      data: {
        mesaId: idMesa,
      },
    });

    await prisma.pedidosItens.createMany({
      data: dadosPedidoItem,
    });

    const pedidoComItens = await prisma.pedidos.findUnique({
      where: { id: novoPedido.id },
      include: {
        itens: {
          omit: {
            itemId: true,
            pedidoId: true,
          },
          include: {
            item: true,
          },
        },
        cartao: {
          include: {
            mesa: true,
          },
          omit: {
            mesaId: true,
          },
        },
      },
      omit: {
        cartaoId: true,
      },
    });

    return pedidoComItens;
  }

  async pesquisarTodos(): Promise<PedidoComItens[] | null> {
    const pedidoComItens = await prisma.pedidos.findMany({
      where: {
        ativo: true,
      },
      include: {
        itens: {
          omit: {
            itemId: true,
            pedidoId: true,
          },
          include: {
            item: true,
          },
        },
        cartao: {
          include: {
            mesa: true,
          },
          omit: {
            mesaId: true,
          },
        },
      },
      omit: {
        cartaoId: true,
      },
    });

    return pedidoComItens;
  }

  async relatorio(dataInicial: Date, dataFinal: Date): Promise<RelatorioPedidos[] | null> {
    const pedidoComItens = await prisma.pedidos.findMany({
      where: {
        ativo: false,
        dataCriacao: {
          gte: dataInicial,
          lte: dataFinal,
        },
      },
      include: {
        itens: {
          omit: {
            pedidoId: true,
          },
          include: {
            item: {
              omit: {
                bebida: true,
                id: true,
              },
            },
          },
        },
      },
      omit: {
        cartaoId: true,
        cliente: true,
        pessoas: true,
      },
    });

    return pedidoComItens;
  }

  async desativarPedido(id: string): Promise<PedidoSemItens | null> {
    const pedidoDesativado = await prisma.pedidos.update({
      where: {
        id,
      },
      data: {
        ativo: false,
      },
    });

    return pedidoDesativado;
  }
}

export { RepositorioPedidos };
