import { Item } from '../../Itens/Interfaces/InterfaceItens';

export interface Pedido {
  id: string;
  cliente: string;
  dataCriacao: Date;
  ativo: boolean;
  valorFinal: number;
  itens: Item[];
  //   cartao?: Cartao;
}

export interface CriarPedido {
  cliente: string;
  valorFinal: number;
  itens: Item[];
}

export interface RequisicaoCriarPedido {
  cliente: string;
  itens: Item[];
  cartao: string;
}
