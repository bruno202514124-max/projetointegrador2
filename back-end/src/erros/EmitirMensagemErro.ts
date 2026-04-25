export class EmitirMensagemErro {
  public readonly mensagem: string;
  public readonly codigo: number;

  constructor(mensagem: string, codigo = 400) {
    this.mensagem = mensagem;
    this.codigo = codigo;
  }
}
