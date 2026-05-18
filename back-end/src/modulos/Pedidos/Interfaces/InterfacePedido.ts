import { Item } from '../../Itens/Interfaces/InterfaceItens';

export interface Pedido {
  id: string;
  cliente: string;
  dataCriacao: Date;
  ativo: boolean;
  // itens: Item[];
  // cartao?: Cartao;
}

export interface PedidoComItens {
  cliente: string;
  pessoas: number;
  id: string;
  dataCriacao: Date;
  ativo: boolean;
  cartaoId: string | null;
  itens: {
    pedidoId: string;
    itemId: string;
    valorItem: number;
    qtdItem: number;
  }[];
}

export interface CriarPedido {
  cliente: string;
  pessoas: number;
  itens: {
    id: string;
    qtd: number;
  }[];
  idCartao: string;
}
