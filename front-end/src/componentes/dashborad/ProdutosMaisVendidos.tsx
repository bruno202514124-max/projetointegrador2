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

  const imagens: Record<string, string> = {
  'Chopp Pilsen': '/img/chopp-pilsen.jpg',
  'Hambúrguer Bulldog': '/img/hamburguer.jpg',
  'Batata Frita': '/img/batata.jpg',
  'Chopp IPA': '/img/chopp-ipa.jpg',
  Refrigerante: '/img/refri.jpg',
};

export default function ProdutosMaisVendidos({ produtos = [] }: ProdutoProps) {
  '';
  // Estado para rastrear qual card está com o mouse em cima
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className={styles.cardBase}>
      <h5 className={styles.sectionTitle}>Queridinhos do Mês</h5>
      <div className="d-flex gap-3 overflow-auto pb-3">
        {produtos.map((p, i) => {
          // Verifica se o mouse está exatamente sobre este card
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

                // --- ANIMAÇÕES DO CARD ---
                border: isHovered ? '1px solid #f4b942' : '1px solid #333',
                transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 8px 20px rgba(244, 185, 66, 0.15)' : 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            >
              {/* O overflow: 'hidden' aqui garante que a imagem com zoom não vaze */}
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={imagens[p.nome] || '/img/default.jpg'}
                  alt={p.nome}
                  style={{
                    width: '100%',
                    height: '160px',
                    objectFit: 'cover',

                    // --- ANIMAÇÃO DE ZOOM NA IMAGEM ---
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.4s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#f4b942',
                    color: '#000',
                    padding: '2px 10px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
                  }}
                >
                  #{i + 1}
                </div>
              </div>
              <div className="p-3">
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
