/* eslint-disable @next/next/no-img-element */
import Botao from '@/componentes/Botao';

interface CardMesaProps {
  numero: number;
  status: 'disponivel' | 'ocupada';
  onClick: () => void;
}

export default function CardMesa({ numero, status, onClick }: CardMesaProps) {
  const estaOcupada = status === 'ocupada';
  const classeCor = estaOcupada ? 'bg-danger' : 'bg-success';

  return (
    <div
      className="position-relative overflow-hidden rounded-3"
      style={{
        minHeight: '110px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
        transition: 'transform 0.2s ease',
      }}
    >
      <Botao
        onClick={onClick}
        className={`w-100 h-100 d-flex flex-column align-items-center justify-content-center p-4 text-white border-0 fw-bold ${classeCor}`}
      >
        <img
          src="/img/Icone_mesa.jpg"
          alt="Ícone da Mesa"
          style={{
            position: 'absolute',
            width: '60px',
            height: '60px',
            bottom: '5px',
            right: '10px',
            opacity: 0.4,
            pointerEvents: 'none',
            objectFit: 'contain',
          }}
        />

        <span
          style={{
            fontSize: '0.75rem',
            opacity: 0.85,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            zIndex: 1,
          }}
        >
          {estaOcupada ? 'Ocupada' : 'Disponível'}
        </span>

        <span style={{ fontSize: '1.3rem', marginTop: '4px', zIndex: 1 }}>Mesa {numero}</span>
      </Botao>
    </div>
  );
}
