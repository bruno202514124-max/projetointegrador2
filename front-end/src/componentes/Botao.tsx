interface PropriedadesBotao {
  onClick(): void;
  textoInterno: string;
}

export default function Botao({ onClick, textoInterno }: PropriedadesBotao) {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      {textoInterno}
    </button>
  );
}
