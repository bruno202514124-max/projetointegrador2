export interface Cartao {
  id: string;
  numero: string;
}
export interface CartaoComMesa {
  id: string;
  numero: string;
  mesa: {
    id: string;
    numero: string;
  } | null;
}
