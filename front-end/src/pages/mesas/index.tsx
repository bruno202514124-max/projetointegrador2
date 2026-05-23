import { useState, useEffect } from 'react';
import LayoutBase from '@/componentes/LayoutBase';
import Botao from '@/componentes/Botao'; 
import styles from '@/css/base.module.css';

// Definição da estrutura da Mesa para o TypeScript
interface Mesa {
  id: number;
  numero: number;
  status: 'disponivel' | 'ocupada'; 
}

export default function Mesas() {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [carregando, setCarregando] = useState(true);

  // O useEffect roda a busca assim que a página carrega
  useEffect(() => {
    async function buscarMesasDoBanco() {
      try {
        // Nova requisição apontando para o seu back-end Express na porta 2000
        const resposta = await fetch('http://localhost:2000/mesas', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Envia o token que o middleware 'autent' do seu back-end exige
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!resposta.ok) {
          throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const dados: Mesa[] = await resposta.json();
        
        // Guarda as mesas do banco no estado do React
        setMesas(dados);
      } catch (error) {
        console.error("Erro ao buscar mesas:", error);
      } finally {
        setCarregando(false);
      }
    }

    buscarMesasDoBanco();
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
          /* Grid que posiciona os botões das mesas lado a lado */
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
            gap: '20px', 
            marginTop: '20px' 
          }}>
            
            {/* Loop que desenha cada mesa vinda do banco */}
            {mesas.map((mesa) => {
              const estaOcupada = mesa.status === 'ocupada';
              const classeCor = estaOcupada ? 'bg-danger' : 'bg-success';

              return (
                <Botao 
                  key={mesa.id} 
                  onClick={() => abrirDetalhesDaMesa(mesa.numero)}
                  className={`w-100 d-flex flex-column align-items-center justify-content-center p-3 rounded-3 text-white border-0 fw-bold ${classeCor}`}
                >
                  <span style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase' }}>
                    {estaOcupada ? 'Ocupada' : 'Livre'}
                  </span>
                  <span style={{ fontSize: '1.2rem', marginTop: '2px' }}>
                    Mesa {mesa.numero}
                  </span>
                </Botao>
              );
            })}

          </div>
        )}
      </div>
    </LayoutBase>
  );
}

/* Falta definir como o back-end realmente interage com a página no momento ocorre erro 404, necessário ajustar integração no back-end*/
