export interface Cartao {
  id: string;
  numero: string;
}
export interface CartaoComDados {
  id: string;
  numero: string;
  mesa: {
    id: string;
    numero: string;
  } | null;
  pedidos: {
    id: string;
    ativo: boolean;
  }[];
}
