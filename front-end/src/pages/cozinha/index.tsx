import { useState } from 'react';
import Header from '@/componentes/Header'; // Ajuste o caminho se necessário

type AbaAtiva = 'cozinha' | 'bar';
type StatusPedido = 'Pendente' | 'Preparando' | 'Pronto';

interface Pedido {
  id: number;
  mesa: string;
  item: string;
  status: StatusPedido;
}

export default function TelaPedidos() {
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('cozinha');

  // Arrays iniciam vazios (sem os dados de teste). 
  // No futuro, você vai preencher isso com os dados do Prisma/Backend.
  const [pedidosCozinha, setPedidosCozinha] = useState<Pedido[]>([]);
  const [pedidosBar, setPedidosBar] = useState<Pedido[]>([]);

  // Função para mudar o status para "Preparando"
  const iniciarPreparo = (id: number, tipo: AbaAtiva) => {
    if (tipo === 'cozinha') {
      setPedidosCozinha(pedidosCozinha.map(p => p.id === id ? { ...p, status: 'Preparando' } : p));
    } else {
      setPedidosBar(pedidosBar.map(p => p.id === id ? { ...p, status: 'Preparando' } : p));
    }
  };

  // Função para dar "Pronto" (remove da tela/lista atual)
  const finalizarPedido = (id: number, tipo: AbaAtiva) => {
    if (tipo === 'cozinha') {
      setPedidosCozinha(pedidosCozinha.filter(p => p.id !== id));
    } else {
      setPedidosBar(pedidosBar.filter(p => p.id !== id));
    }
  };

  // Estilo padrão para os botões de ação do card
  const btnAcaoEstilo = (bg: string) => ({
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
    color: 'white',
    backgroundColor: bg,
    flex: 1
  });

  // Estilo para o aviso de tela vazia gigante
  const avisoVazioEstilo = {
    fontSize: '28px',
    color: '#888',
    textAlign: 'center' as const,
    marginTop: '60px',
    fontWeight: 'bold'
  };

  return (
    <div>
      <Header />

      <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        {/* --- SELETOR DE ABAS --- */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => setAbaAtiva('cozinha')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: abaAtiva === 'cozinha' ? '#0070f3' : '#e0e0e0',
              color: abaAtiva === 'cozinha' ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            🍳 Cozinha (Comidas)
          </button>

          <button
            onClick={() => setAbaAtiva('bar')}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: abaAtiva === 'bar' ? '#0070f3' : '#e0e0e0',
              color: abaAtiva === 'bar' ? 'white' : 'black',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            🍹 Bar (Bebidas)
          </button>
        </div>

        <hr style={{ border: '0.5px solid #ccc', marginBottom: '20px' }} />

        {/* --- CONTEÚDO DINÂMICO --- */}
        {abaAtiva === 'cozinha' ? (
          <div>
            <h2>Pedidos da Cozinha</h2>
            
            {/* Verifica se a lista está vazia para mostrar a mensagem GIGANTE */}
            {pedidosCozinha.length === 0 ? (
              <div style={avisoVazioEstilo}>
                Nenhum pedido de comida na fila! 
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {pedidosCozinha.map((p) => (
                  <div key={p.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', minWidth: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'between' }}>
                    <div>
                      <h3>{p.mesa}</h3>
                      <p><strong>Item:</strong> {p.item}</p>
                      <p>Status: <span style={{ color: p.status === 'Preparando' ? 'orange' : 'red', fontWeight: 'bold' }}>{p.status}</span></p>
                    </div>
                    
                    {/* Botões de Ação */}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
                      <button 
                        onClick={() => iniciarPreparo(p.id, 'cozinha')}
                        style={btnAcaoEstilo('#f39c12')}
                        disabled={p.status === 'Preparando'}
                      >
                        🕒 Preparar
                      </button>
                      <button 
                        onClick={() => finalizarPedido(p.id, 'cozinha')}
                        style={btnAcaoEstilo('#2ecc71')}
                      >
                        ✔️ Pronto
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2>Pedidos do Bar</h2>

            {/* Verifica se a lista está vazia para mostrar a mensagem GIGANTE */}
            {pedidosBar.length === 0 ? (
              <div style={avisoVazioEstilo}>
                Nenhum pedido de bebida na fila! 
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {pedidosBar.map((p) => (
                  <div key={p.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', minWidth: '220px', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column', justifyContent: 'between' }}>
                    <div>
                      <h3>{p.mesa}</h3>
                      <p><strong>Bebida:</strong> {p.item}</p>
                      <p>Status: <span style={{ color: p.status === 'Preparando' ? 'orange' : 'red', fontWeight: 'bold' }}>{p.status}</span></p>
                    </div>

                    {/* Botões de Ação */}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
                      <button 
                        onClick={() => iniciarPreparo(p.id, 'bar')}
                        style={btnAcaoEstilo('#f39c12')}
                        disabled={p.status === 'Preparando'}
                      >
                        🕒 Preparar
                      </button>
                      <button 
                        onClick={() => finalizarPedido(p.id, 'bar')}
                        style={btnAcaoEstilo('#2ecc71')}
                      >
                        ✔️ Pronto
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}