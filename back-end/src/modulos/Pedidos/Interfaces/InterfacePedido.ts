import { Item } from '../../Itens/Interfaces/InterfaceItens';

export interface Pedido {
  id: string;
  cliente: string;
  dataCriacao: Date;
  ativo: boolean;
}

export interface PedidoComItens {
  cliente: string;
  pessoas: number;
  id: string;
  dataCriacao: Date;
  ativo: boolean;
  itens: {
    valorItem: number;
    qtdItem: number;
    item: Item;
  }[];
  cartao: {
    id: string;
    numero: string;
    mesa: { id: string; numero: string } | null;
  } | null;
}

export interface CriarPedido {
  cliente: string;
  pessoas: number;
  itens: {
    id: string;
    qtd: number;
  }[];
  idCartao: string;
  idMesa: string;
}

export interface RelatorioPedidos {
  id: string;
  dataCriacao: Date;
  ativo: boolean;
  itens: {
    itemId: string;
    valorItem: number;
    qtdItem: number;
    item: {
      nome: string;
      preco: number;
    };
  }[];
}
