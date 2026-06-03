import { useState, useEffect } from 'react';
import { api } from '@/api';
import LayoutBase from '@/componentes/LayoutBase';
import CardMesa from '@/componentes/mesas/CardMesa'; 
import styles from '@/css/base.module.css';  /* front-end\src\componentes\mesas\card_mesas.tsx */

interface Mesa {
  id: string; // id está como text estão seria string
  numero: number;
  status: 'disponivel' | 'ocupada'; 
}

export default function Mesas() {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Buscando os dados usando a API 
    api.get('/mesas')
      .then((resposta) => {
        setMesas(resposta.data);
      })
      .catch((erro) => {
        console.error("Erro ao buscar mesas:", erro);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []); 

  const abrirDetalhesDaMesa = (numeroMesa: number) => {
    alert(`Você clicou na Mesa ${numeroMesa}`);
  };

  return (
    <LayoutBase titulo="Mesas" subtitulo="Base para controle de mesas.">
      <div className={styles.cardBase}>
        <h2 className={styles.sectionTitle}>Controle de mesas</h2>
        
        {carregando ? (
          <p className={styles.helpText}>Carregando mesas do sistema...</p>
        ) : mesas.length === 0 ? (
          <p className={styles.helpText}>Nenhuma mesa cadastrada no banco de dados ainda.</p>
        ) : (
          /* Grid que posiciona as mesas lado a lado */
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
            gap: '20px', 
            marginTop: '20px' 
          }}>
            
            {/* Loop chamando diretamente o card, ao invés de ser inserido direto na página */}
            {mesas.map((mesa) => (
              <CardMesa
                key={mesa.id}
                numero={mesa.numero}
                status={mesa.status}
                onClick={() => abrirDetalhesDaMesa(mesa.numero)}
              />
            ))}

          </div>
        )}
      </div>
    </LayoutBase>
  );
}