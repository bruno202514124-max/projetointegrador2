/* eslint-disable @next/next/no-img-element */
import styles from '@/css/base.module.css';
import { useState } from 'react';

  type ProdutoProps = {
    produtos: {
      id: string;
      nome: string;
      preco: number;
      qtd: number;
    }[];
  };

export default function ProdutosMaisVendidos({ produtos = [] }: ProdutoProps) {
  '';

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className={styles.cardBase}>
      <h5 className={styles.sectionTitle}>Queridinhos do Mês</h5>
      <div className="d-flex gap-3 overflow-auto pb-3"
        style={{paddingTop: '8px', }}>

        {produtos.map((p, i) => {
          const isHovered = hoverIndex === i;

          return (
            <div
              key={i}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{
                minWidth: '260px',
                borderRadius: '15px',
                overflow: 'hidden',
                backgroundColor: '#1a1a1a',
                border: isHovered ? '1px solid #f4b942' : '1px solid #333',
                transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 8px 20px rgba(244, 185, 66, 0.15)' : 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            >

              <div className="p-3">
                <div
                  style={{
                    backgroundColor: '#f4b942',
                    color: '#000',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    display: 'inline-block',
                    marginBottom: '12px',
                  }}
                >
                  #{i + 1}
                </div>
                <h6 className="m-0" style={{ color: '#fff', fontWeight: 700 }}>
                  {p.nome}
                </h6>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <small style={{ color: '#888' }}>{p.qtd} vendas </small>
                  <span style={{ color: '#f4b942', fontWeight: 800 }}>R$ {p.preco}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
