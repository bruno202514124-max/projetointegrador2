interface PropriedadesBotao {
  onClick(): void;
  children: React.ReactNode;
  className?: string;
}

export default function Botao({
  onClick,
  children,
  className = '',
}: PropriedadesBotao) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={{
        background: 'transparent',
        border: 'none',
        padding: 0,
      }}
    >
      {children}
    </button>
  );
}