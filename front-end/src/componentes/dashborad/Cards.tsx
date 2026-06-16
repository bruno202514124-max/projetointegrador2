import styles from '@/css/base.module.css';
import { useState } from 'react';

type CardProps = {
  titulo: string;
  valor: string;
  cor?: string;
};

export default function Card({ titulo, valor, cor }: CardProps) {
  const [hover, setHover] = useState(false);

  const corBorda = cor === 'text-success' ? '#4ade80' : cor === 'text-danger' ? '#ff5f5f' : '#f4b942';

  return (
    <div 
      className={styles.cardBase} 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ 
        borderTop: `4px solid ${corBorda}`,
        

        transform: hover ? 'translateY(-8px)' : 'translateY(0)', 
        boxShadow: hover ? '0 12px 24px rgba(0,0,0,0.4)' : '0 4px 10px rgba(0,0,0,0.1)', 
        transition: 'all 0.3s ease-in-out', 
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