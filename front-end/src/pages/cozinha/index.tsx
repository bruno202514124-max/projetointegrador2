/* eslint-disable react-hooks/exhaustive-deps */
import { api } from '@/api';
import Header from '@/componentes/Header';
import { tratarErro } from '@/utils/tratarErro';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

type AbaAtiva = 'cozinha' | 'bar';

interface Item {
  id: string;
  nome: string;
  preco: number;
  bebida: boolean;
}

interface PedidoAtivo {
  id: string;
  cliente: string;
  pessoas: number;
  itens: {
    valorItem: number;
    qtdItem: number;
    status: string;
    item: Item;
  }[];
  cartao: {
    id: string;
    numero: string;
    mesa: {
      id: string;
      numero: string;
    } | null;
  } | null;
}

export default function TelaPedidosCozinhaEBar() {
  const router = useRouter();
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('cozinha');
  const [pedidos, setPedidos] = useState<PedidoAtivo[]>([]);

  const carregarPedidos = async () => {
    api
      .get('/pedidos/')
      .then(res => {
        const dadosDoBanco: PedidoAtivo[] = Array.isArray(res.data) ? res.data : [];
        setPedidos(dadosDoBanco);
      })
      .catch(error => {
        tratarErro(error, router);
      });
  };

  useEffect(() => {
    carregarPedidos();
    const intervalo = setInterval(carregarPedidos, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const alterarStatusDoItem = async (
    idPedido: string,
    idItem: string,
    novoStatus: 'preparando' | 'pronto'
  ) => {
    setPedidos(pedidosAnteriores =>
      pedidosAnteriores.map(p => {
        if (p.id !== idPedido) return p;
        return {
          ...p,
          itens: p.itens.map(it => (it.item?.id === idItem ? { ...it, status: novoStatus } : it)),
        };
      })
    );

    api
      .patch('/pedidos/alterarStatus', {
        idPedido,
        idItem,
        status: novoStatus,
      })
      .then(() => {
        carregarPedidos();
      })
      .catch(error => {
        carregarPedidos();
        tratarErro(error, router);
      });
  };

  const pedidosFiltrados = pedidos
    .map(pedido => {
      const itensFiltrados =
        pedido.itens?.filter(itemPedido => {
          const ehBebida = itemPedido.item?.bebida;
          const statusItem = itemPedido.status?.toLowerCase() || 'pendente';

          if (statusItem === 'pronto') return false;

          return abaAtiva === 'cozinha' ? !ehBebida : ehBebida;
        }) || [];

      return {
        ...pedido,
        itens: itensFiltrados,
      };
    })
    .filter(pedido => pedido.itens.length > 0);

  const btnAcaoEstilo = (bg: string) => ({
    padding: '10px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
    color: 'white',
    backgroundColor: bg,
    fontSize: '14px',
    marginTop: '5px',
  });

  return (
    <div>
      <Header />

      <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
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
              borderRadius: '5px',
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
              borderRadius: '5px',
            }}
          >
            🍹 Bar (Bebidas)
          </button>
        </div>

        <hr style={{ border: '0.5px solid #ccc', marginBottom: '20px' }} />

        <div>
          <h2 style={{ color: '#fff', marginBottom: '20px' }}>
            Fila de Espera ({abaAtiva === 'cozinha' ? 'Cozinha' : 'Bar'})
          </h2>

          {pedidosFiltrados.length === 0 ? (
            <div
              style={{
                fontSize: '28px',
                color: '#888',
                textAlign: 'center',
                marginTop: '60px',
                fontWeight: 'bold',
              }}
            >
              Nenhum pedido pendente nesta fila! 🙌
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              {pedidosFiltrados.map(p => {
                return (
                  <div
                    key={p.id}
                    style={{
                      border: '1px solid #333',
                      padding: '20px',
                      borderRadius: '8px',
                      minWidth: '300px',
                      backgroundColor: '#1e1e1e',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', color: '#ffc107' }}>
                        Mesa {p.cartao?.mesa?.numero || '-'}
                      </h3>
                      <p style={{ margin: '0 0 15px 0', color: '#aaa', fontSize: '14px' }}>
                        Cliente: <strong style={{ color: '#fff' }}>{p.cliente}</strong>
                      </p>

                      <div style={{ borderTop: '1px dashed #444', paddingTop: '12px' }}>
                        {p.itens.map((itemPedido, index) => {
                          const statusItem = itemPedido.status?.toLowerCase() || 'pendente';

                          return (
                            <div
                              key={`${p.id}-item-${index}`}
                              style={{
                                marginBottom: '15px',
                                paddingBottom: '10px',
                                borderBottom:
                                  index !== p.itens.length - 1 ? '1px solid #2a2a2a' : 'none',
                              }}
                            >
                              <p style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#fff' }}>
                                <span
                                  style={{ color: '#ffc107', fontWeight: 'bold', marginRight: '6px' }}
                                >
                                  {itemPedido.qtdItem}x
                                </span>
                                <strong>{itemPedido.item?.nome}</strong>
                              </p>

                              <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#888' }}>
                                Status:{' '}
                                <span
                                  style={{
                                    color: statusItem === 'preparando' ? '#ff9800' : '#dc3545',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  {statusItem.toUpperCase()}
                                </span>
                              </p>

                              <div style={{ display: 'flex', gap: '5px' }}>
                                <button
                                  onClick={() =>
                                    alterarStatusDoItem(p.id, itemPedido.item.id, 'preparando')
                                  }
                                  disabled={statusItem === 'preparando'}
                                  style={{
                                    ...btnAcaoEstilo('#f39c12'),
                                    opacity: statusItem === 'preparando' ? 0.4 : 1,
                                    cursor: statusItem === 'preparando' ? 'not-allowed' : 'pointer',
                                  }}
                                >
                                  🕒 Preparar
                                </button>
                                <button
                                  onClick={() => alterarStatusDoItem(p.id, itemPedido.item.id, 'pronto')}
                                  style={btnAcaoEstilo('#2ecc71')}
                                >
                                  ✔️ Pronto
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
