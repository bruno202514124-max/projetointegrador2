import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; //Adicionado para gerenciar navegação entre telas (redirecionar para página de pedidos).
import { api } from '@/api'; 
import LayoutBase from '@/componentes/LayoutBase';
import CardMesa from '@/componentes/mesas/CardMesa'; 
import styles from '@/css/base.module.css';  
import { tratarErro } from '@/utils/tratarErro'; // Centraliza o tratamento de erros HTTP e validação de token.
import Swal from 'sweetalert2'; // Substitui o 'alert' nativo por modais estéticos e caixas de confirmação de qualidade.
// EVOLUÇÃO: Novas interfaces criadas para suportar a complexidade de comandas e itens vinculados a uma mesa.
interface ItemPedido {
  item: { nome: string };
  qtdItem: number;
  valorItem: number; // Mantém o padrão de nomenclatura exato usado pelo modelo de dados do back-end.
}

interface PedidoAtivo {
  id: string;
  cliente: string;
  pessoas: number;
  itens: ItemPedido[];
  cartao: {
    id: string;
    numero: number;
    mesa: {
      id: string;
      numero: number;
    } | null;
  } | null;
}

interface Mesa {
  id: string; 
  numero: number;
  status: 'disponivel' | 'ocupada'; 
  pedidos?: PedidoAtivo[]; // A mesa agora opcionalmente carrega uma lista de pedidos associados a ela.
}

interface CartaoDisponivel {
  id: string;
  numero: number;
}
// NOVA ADIÇÃO: Utilitário para formatar os valores numéricos no padrão da moeda Real (R$).
const formatarReal = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export default function Mesas() {
  const router = useRouter();
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [cartoesLivres, setCartoesLivres] = useState<CartaoDisponivel[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null); // Controla qual mesa está com o Modal aberto

  // NOVA ADIÇÃO: Estado para gerenciar sub-abas no modal (Alternar entre ver consumo atual e abrir uma nova comanda na mesma mesa).
  // Ainda em desenvolvimento, no estado atual não é possível adicionar uma nova comanda na mesma mesa, somente pela página de pedidos!
  const [abaCriarSecundaria, setAbaCriarSecundaria] = useState(false);

  // ADIÇÃO: Estados isolados para gerenciar o formulário de abertura de novos atendimentos.
  const [nomeCliente, setNomeCliente] = useState('');
  const [qtdPessoas, setQtdPessoas] = useState(1);
  const [idCartaoSelecionado, setIdCartaoSelecionado] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setCarregando(true);
      
      // NOVA ADIÇÃO: Substituído o 'api.get' isolado por um 'Promise.all'. 
      // Por que essa escolha? Dispara as três requisições ao mesmo tempo em paralelo, otimizando drasticamente o carregamento.
      const [resMesas, resCartoes, resPedidos] = await Promise.all([
        api.get('mesas'),
        api.get('cartoes/'),
        api.get('pedidos/')
      ]);

      const listaDePedidos = resPedidos.data || [];

      // NOVA ADIÇÃO: Agrupamento inteligente. Como a API não traz os pedidos dentro da mesa, o front-end 
      // faz esse mapeamento cruzando o id da mesa com os cartões associados aos pedidos ativos.
      const mesasFormatadas = resMesas.data.map((mesa: Mesa) => {
        const pedidosDaMesa = listaDePedidos.filter(
          (pedido: PedidoAtivo) => pedido.cartao?.mesa?.id === mesa.id
        );

        const statusReal = pedidosDaMesa.length > 0 ? 'ocupada' : mesa.status;

        return {
          ...mesa,
          status: statusReal,
          pedidos: pedidosDaMesa
        };
      });

      // NOVA ADIÇÃO: Garante que as mesas fiquem sempre ordenadas de forma crescente pelo número da mesa.
      setMesas(mesasFormatadas.sort((a: Mesa, b: Mesa) => Number(a.numero) - Number(b.numero)));
      setCartoesLivres(resCartoes.data || []);

    } catch (erro) {
      console.error("Erro ao carregar dados do painel:", erro);
      tratarErro(erro, router);
    } finally {
      setCarregando(false);
    }
  };
  // NOVA ADIÇÃO: Substitui o antigo 'alert'. Agora abre o modal do Bootstrap injetando os dados da mesa clicada.
  const abrirDetalhesDaMesa = (mesa: Mesa) => {
    setMesaSelecionada(mesa);
    setAbaCriarSecundaria(false);
    limparFormulario();
  };

  const limparFormulario = () => {
    setNomeCliente('');
    setQtdPessoas(1);
    setIdCartaoSelecionado('');
  };

  const fecharModal = () => {
    setMesaSelecionada(null);
  };

  // EM DESENVOLVIMENTO: Função para abrir comanda. Atualiza o status da mesa para ocupada no back-end.
  // ---
  const handleAbrirComanda = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeCliente || !idCartaoSelecionado || !mesaSelecionada) return;

    try {
      setEnviando(true);
      
      await api.patch('/mesas/atualizar', {
        id: mesaSelecionada.id,
        numero: mesaSelecionada.numero,
        status: 'ocupada',
        cliente: nomeCliente,
        pessoas: qtdPessoas,
        cartaoId: idCartaoSelecionado
      });

      Swal.fire({
        icon: 'success',
        title: 'Comanda aberta!',
        text: `Cartão Nº ${cartoesLivres.find(c => c.id === idCartaoSelecionado)?.numero} vinculado a Mesa ${mesaSelecionada.numero}`,
        timer: 2000,
        showConfirmButton: false
      });

      fecharModal();
      carregarDados(); 
    } catch (erro) {
      tratarErro(erro, router);
    } finally {
      setEnviando(false);
    }
  };

  // NOVA ADIÇÃO: Botão "Lançar Item".
  // Por que essa escolha? Guarda os IDs no localStorage para que a página de destino ('/cadastro-pedidos') 
  // saiba exatamente qual mesa e comanda estão recebendo os novos produtos, sem poluir a URL.
  const irParaAdicionarItens = (pedidoId: string) => {
    if (!mesaSelecionada) return;

    localStorage.setItem('atendimento_mesa_id', mesaSelecionada.id);
    localStorage.setItem('atendimento_pedido_id', pedidoId);

    router.push('/cadastro-pedidos');
  };

  // NOVA ADIÇÃO: Encerramento de conta individual.
  // Por que essa escolha? Bate no endpoint correto '/pedidos/desativarPedido' via PATCH.
  // Isso faz um 'soft delete' (desativa a comanda visualmente mudando o status, mas preserva os dados no banco para relatórios futuros pelo Dashboard).
  const handlePagarComanda = async (idPedido: string) => {
    try {
      const resultado = await Swal.fire({
        title: 'Encerrar Comanda?',
        text: 'Deseja confirmar o pagamento e fechar esta comanda?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, pagar',
        cancelButtonText: 'Cancelar'
      });

      if (!resultado.isConfirmed) return;

      setCarregando(true);

      await api.patch('/pedidos/desativarPedido', { id: idPedido });

      Swal.fire('Pago!', 'A comanda foi encerrada com sucesso.', 'success');

      fecharModal();
      carregarDados();
    } catch (erro) {
      tratarErro(erro, router);
    } finally {
      setCarregando(false);
    }
  };

  // Renderização principal da página. Exibe o layout base, o painel de mesas e o modal de detalhes da mesa quando necessário.
  return (
    <LayoutBase titulo="Mesas" subtitulo="Painel Operacional de Atendimento">
      <div className={styles.cardBase}>
        <h2 className={styles.sectionTitle}>Controle de mesas</h2>
        
        {carregando ? (
          <p className={styles.helpText}>Carregando painel...</p>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
            gap: '20px', 
            marginTop: '20px'
          }}>
            {mesas.map((mesa) => (
              <CardMesa
                key={mesa.id}
                numero={mesa.numero}
                status={mesa.status}
                onClick={() => abrirDetalhesDaMesa(mesa)}
              />
            ))}
          </div>
        )}
      </div>

      {/* MODAL DO BOOTSTRAP ADAPTADO TAMBÉM PARA CELULAR, NECESSÁRIO REALIZAR MAIS TESTES E ALTERAÇÕES*/}
      {mesaSelecionada && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }} onClick={fecharModal}>
          <div className="modal-dialog modal-dialog-centered modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content bg-dark text-white border border-secondary">
              
              <div className="modal-header border-secondary">
                <h5 className="modal-title fw-bold">Mesa {mesaSelecionada.numero}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={fecharModal}></button>
              </div>

              <div className="modal-body" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                
                {/* CASO 1: MESA LIVRE OU ABA DE ADICIONAR COMANDA COMPANHEIRA */}
                {mesaSelecionada.status === 'disponivel' || abaCriarSecundaria ? (
                  <form onSubmit={handleAbrirComanda}>
                    <h6 className="text-warning small mb-3 fw-bold">
                      {abaCriarSecundaria ? '➕ Nova Comanda nesta Mesa' : 'Abrir Atendimento'}
                    </h6>
                    <div className="mb-2">
                      <label className="form-label small m-0 fw-bold text-muted">Nome do Cliente</label>
                      <input 
                        type="text" 
                        className="form-control form-control-sm bg-secondary text-white border-0" 
                        required
                        placeholder="Ex: Alexandre"
                        value={nomeCliente}
                        onChange={e => setNomeCliente(e.target.value)}
                      />
                    </div>

                    <div className="row g-2 mb-3">
                      <div className="col-7">
                        <label className="form-label small m-0 text-muted">Comanda / Cartão</label>
                        <select 
                          className="form-select form-select-sm bg-secondary text-white border-0"
                          required
                          value={idCartaoSelecionado}
                          onChange={e => setIdCartaoSelecionado(e.target.value)}
                        >
                          <option value="">Escolha...</option>
                          {cartoesLivres.map(c => (
                            <option key={c.id} value={c.id}>Nº {c.numero}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-5">
                        <label className="form-label small m-0 text-muted">Pessoas</label>
                        <input 
                          type="number" 
                          className="form-control form-control-sm bg-secondary text-white border-0" 
                          min="1" 
                          value={qtdPessoas}
                          onChange={e => setQtdPessoas(Number(e.target.value))}
                        />
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      {abaCriarSecundaria && (
                        <button type="button" className="btn btn-outline-light btn-sm w-50" onClick={() => setAbaCriarSecundaria(false)}>
                          Voltar
                        </button>
                      )}
                      <button type="submit" className={`btn btn-success btn-sm fw-bold ${abaCriarSecundaria ? 'w-50' : 'w-100'}`} disabled={enviando}>
                        {enviando ? 'Gravando...' : 'Confirmar'}
                      </button>
                    </div>
                  </form>
                ) : (
                  /* CASO 2: MESA OCUPADA - EXIBE A LISTA DE COMANDAS INDIVIDUAIS */
                  <div>
                    {/* Botão para criar nova comanda (no momento não funciona na prática) */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="small text-muted">Comandas ativas:</span>
                      <button 
                        className="btn btn-sm btn-outline-warning py-0 px-2 fw-bold" 
                        style={{ fontSize: '0.75rem' }}
                        onClick={() => setAbaCriarSecundaria(true)}
                      >
                        ➕ Nova Comanda
                      </button>
                    </div>

                    {/* Loop passando por cada cliente/cartão individual que está na mesma mesa */}
                    {mesaSelecionada.pedidos && mesaSelecionada.pedidos.map((pedido) => {
                      const totalDoCliente = pedido.itens.reduce((acc, it) => acc + (it.valorItem * it.qtdItem), 0);
                      
                      return (
                        <div key={pedido.id} className="bg-secondary bg-opacity-25 rounded p-2 mb-3 border border-secondary">
                          <div className="d-flex justify-content-between align-items-start small fw-bold text-warning">
                            <span>{pedido.cliente}</span>
                            <span>Cartão: {pedido.cartao?.numero || '-'}</span>
                          </div>
                          
                          {/* Lista interna de itens consumidos por essa pessoa específica */}
                          <div className="my-2 border-top border-secondary pt-1" style={{ maxHeight: '80px', overflowY: 'auto' }}>
                            {pedido.itens.length === 0 ? (
                              <p className="text-muted text-center m-0" style={{ fontSize: '0.7rem' }}>Nenhum item lançado.</p>
                            ) : (
                              pedido.itens.map((it, idx) => (
                                <div key={idx} className="d-flex justify-content-between text-light" style={{ fontSize: '0.75rem' }}>
                                  <span>{it.qtdItem}x {it.item.nome}</span>
                                  <span>{formatarReal.format(it.valorItem * it.qtdItem)}</span>
                                </div>
                              ))
                            )}
                          </div>
                            {/* botão de adição de itens (no momento redireciona para a página de pedidos para gerar uma NOVA comanda) */}
                          <div className="d-flex flex-column gap-2 pt-1 border-top border-secondary">
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="small text-muted fw-bold">Total: {formatarReal.format(totalDoCliente)}</span>
                              <button 
                                className="btn btn-warning btn-sm py-0 px-2 fw-bold text-dark" 
                                style={{ fontSize: '0.75rem' }}
                                onClick={() => irParaAdicionarItens(pedido.id)}
                              >
                                ➕ Lançar Item
                              </button>
                            </div>
                            {/* Botão de encerramento da comanda individual */}
                            <button
                              className="btn btn-danger btn-sm py-1 fw-bold w-100 mt-1"
                              style={{ fontSize: '0.75rem' }}
                              onClick={() => handlePagarComanda(pedido.id)}
                            >
                              💵 Pagar e Encerrar Conta
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutBase>
  );
}