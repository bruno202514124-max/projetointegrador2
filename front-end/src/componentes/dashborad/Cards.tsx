import styles from '@/css/base.module.css';
import { useState } from 'react';

type CardProps = {
  titulo: string;
  valor: string;
  cor?: string;
};

export default function Card({ titulo, valor, cor }: CardProps) {
  // Estado para controlar se o mouse está em cima do card
  const [hover, setHover] = useState(false);

  // Define a cor da borda superior com base na prop 'cor'
  const corBorda = cor === 'text-success' ? '#4ade80' : cor === 'text-danger' ? '#ff5f5f' : '#f4b942';

  return (
    <div 
      className={styles.cardBase} 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ 
        borderTop: `4px solid ${corBorda}`,
        
        // --- A MÁGICA DA ANIMAÇÃO ACONTECE AQUI ---
        transform: hover ? 'translateY(-8px)' : 'translateY(0)', // Sobe 8 pixels no hover
        boxShadow: hover ? '0 12px 24px rgba(0,0,0,0.4)' : '0 4px 10px rgba(0,0,0,0.1)', // Sombra aumenta
        transition: 'all 0.3s ease-in-out', // Deixa a transição suave (0.3 segundos)
        cursor: 'default'
      }}
    >
      <p className="text-secondary m-0" style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
        {titulo}
      </p>
      <h2 className={`${cor} m-0`} style={{ fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.5px' }}>
        {valor}
      </h2>
    </div>
  );
}