export interface Item {
  id: string;
  nome: string;
  preco: number;
  bebida: boolean;
  //   pedidos?: Pedido[]
}

export interface CriarItem {
  nome: string;
  preco: number;
  bebida: boolean;
}
