export interface ILogarUsuario {
  nome: string;
  senha: string;
  permissao: string;
}
export interface IAtualizarUsuario {
  id: string;
  nome?: string;
  senha?: string;
  permissao?: string;
}
