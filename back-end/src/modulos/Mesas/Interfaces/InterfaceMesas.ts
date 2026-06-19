export interface Mesa {
  id: string;
  numero: string;
}
export interface MesaComCartoes {
  id: string;
  numero: string;
  cartoes: {
    id: string;
    numero: string;
  }[];
}
