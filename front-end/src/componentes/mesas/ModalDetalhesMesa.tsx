import { api } from '@/api';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { BotaoComanda } from '@/componentes/mesas/BotaoComanda';

interface ModalDetalhesMesaProps {
  mesaSelecionada: any;
  mesas: any[];
  cartoesLivres: any[];
  produtos: any[];
  formatarReal: Intl.NumberFormat;
  fecharModal: () => void;
  carregarDados: () => void;
  tratarErro: (erro: any, router: any) => void;
  router: any;
  podeEncerrar: boolean;
}

export default function ModalDetalhesMesa({
  mesaSelecionada,
  mesas,
  cartoesLivres,
  produtos,
  formatarReal,
  fecharModal,
  carregarDados,
  tratarErro,
  router,
  podeEncerrar,
}: ModalDetalhesMesaProps) {
  const [abaCriarSecundaria, setAbaCriarSecundaria] = useState(false);
  const [nomeCliente, setNomeCliente] = useState('');
  const [qtdPessoas, setQtdPessoas] = useState(1);
  const [idCartaoSelecionado, setIdCartaoSelecionado] = useState('');
  const [idProdutoSelecionado, setIdProdutoSelecionado] = useState('');
  const [qtdProduto, setQtdProduto] = useState(1);
  const [itensCarrinho, setItensCarrinho] = useState<any[]>([]);
  const [enviando, setEnviando] = useState(false);

  const [pedidoIdSendoEditado, setPedidoIdSendoEditado] = useState<string | null>(null);
  const [idProdutoEdicao, setIdProdutoEdicao] = useState('');
  const [qtdProdutoEdicao, setQtdProdutoEdicao] = useState(1);
  const [itensCarrinhoEdicao, setItensCarrinhoEdicao] = useState<any[]>([]);

  const limparFormulario = () => {
    setNomeCliente('');
    setQtdPessoas(1);
    setIdCartaoSelecionado('');
    setIdProdutoSelecionado('');
    setQtdProduto(1);
    setItensCarrinho([]);
  };

  const limparFormularioEdicao = () => {
    setPedidoIdSendoEditado(null);
    setIdProdutoEdicao('');
    setQtdProdutoEdicao(1);
    setItensCarrinhoEdicao([]);
  };

  const adicionarAoCarrinho = () => {
    const produto = produtos.find(p => p.id === idProdutoSelecionado);
    if (!produto) return;

    const itemJaExiste = itensCarrinho.find(item => item.id === idProdutoSelecionado);
    if (itemJaExiste) {
      setItensCarrinho(
        itensCarrinho.map(item =>
          item.id === idProdutoSelecionado ? { ...item, qtd: item.qtd + qtdProduto } : item
        )
      );
    } else {
      setItensCarrinho([...itensCarrinho, { ...produto, qtd: qtdProduto }]);
    }
    setIdProdutoSelecionado('');
    setQtdProduto(1);
  };

  const adicionarAoCarrinhoEdicao = () => {
    const prod = produtos.find(p => p.id === idProdutoEdicao);
    if (!prod) return;

    const itemJaExiste = itensCarrinhoEdicao.find(item => item.id === idProdutoEdicao);
    if (itemJaExiste) {
      setItensCarrinhoEdicao(
        itensCarrinhoEdicao.map(item =>
          item.id === idProdutoEdicao ? { ...item, qtd: item.qtd + qtdProdutoEdicao } : item
        )
      );
    } else {
      setItensCarrinhoEdicao([...itensCarrinhoEdicao, { ...prod, qtd: qtdProdutoEdicao }]);
    }
    setIdProdutoEdicao('');
    setQtdProdutoEdicao(1);
  };

  const handleAbrirComanda = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeCliente || !idCartaoSelecionado || !mesaSelecionada || itensCarrinho.length === 0) {
      Swal.fire('Atenção', 'Adicione pelo menos um item à comanda!', 'warning');
      return;
    }

    try {
      setEnviando(true);

      await api.post('/pedidos/criar', {
        cliente: nomeCliente,
        text: `Mesa ${mesaSelecionada.numero}`,
        pessoas: qtdPessoas,
        idMesa: mesaSelecionada.id,
        idCartao: idCartaoSelecionado,
        itens: itensCarrinho.map(i => ({ id: i.id, qtd: i.qtd })),
      });

      await Swal.fire({
        icon: 'success',
        title: 'Comanda aberta!',
        text: `Cartão Nº ${cartoesLivres.find(c => c.id === idCartaoSelecionado)?.numero} vinculado a Mesa ${mesaSelecionada.numero}`,
        timer: 2000,
        showConfirmButton: false,
        background: '#212529',
        color: '#fff',
      });

      setAbaCriarSecundaria(false);
      limparFormulario();
      fecharModal();
      carregarDados();
    } catch (erro) {
      tratarErro(erro, router);
    } finally {
      setEnviando(false);
    }
  };

  const handleSalvarNovosItens = async (pedidoId: string) => {
    if (itensCarrinhoEdicao.length === 0) {
      Swal.fire('Atenção', 'Adicione pelo menos um item à lista para poder salvar!', 'warning');
      return;
    }

    try {
      setEnviando(true);

      const requisicoes = itensCarrinhoEdicao.map(item => {
        return api.post('/pedidos/incluirItem', {
          idPedido: pedidoId,
          idItem: item.id,
          valorItem: item.preco,
          qtdItem: item.qtd,
        });
      });
      await Promise.all(requisicoes);

      Swal.fire({
        icon: 'success',
        title: 'Itens adicionados!',
        timer: 1500,
        showConfirmButton: false,
        background: '#212529',
        color: '#fff',
      });

      limparFormularioEdicao();
      carregarDados();
    } catch (erro) {
      tratarErro(erro, router);
    } finally {
      setEnviando(false);
    }
  };

  const handlePagarComanda = async (idPedido: string) => {
    try {
      const resultado = await Swal.fire({
        title: 'Encerrar Comanda?',
        text: 'Deseja confirmar o pagamento e fechar esta comanda?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Sim, pagar',
        cancelButtonText: 'Cancelar',
        background: '#212529',
        color: '#fff',
      });

      if (!resultado.isConfirmed) return;

      await api.patch('/pedidos/desativarPedido', { id: idPedido });

      Swal.fire({
        title: 'Pago!',
        text: 'A comanda foi encerrada com sucesso.',
        icon: 'success',
        background: '#212529',
        color: '#fff',
      });
      fecharModal();
      carregarDados();
    } catch (erro) {
      tratarErro(erro, router);
    }
  };

  const handleRemoverItem = async (pedidoId: string, itemId: string, nomeItem: string) => {
    try {
      const resultado = await Swal.fire({
        title: 'Remover Item?',
        text: `Deseja realmente retirar "${nomeItem}" desta comanda?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sim, remover',
        cancelButtonText: 'Cancelar',
        background: '#212529',
        color: '#fff'
      });

      if (!resultado.isConfirmed) return;

      await api.delete(`/pedidos/removerItem/${pedidoId}/${itemId}`);

      Swal.fire({
        icon: 'success',
        title: 'Item removido!',
        timer: 1500,
        showConfirmButton: false,
        background: '#212529',
        color: '#fff'
      });

      carregarDados();
    } catch (erro) {
      tratarErro(erro, router);
    }
  };

  return (
    <div className="modal d-block bg-dark bg-opacity-50" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-white border-secondary">
          <div className="modal-header border-secondary">
            <h5 className="modal-title">Mesa {mesaSelecionada.numero}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={fecharModal}></button>
          </div>

          <div className="modal-body">
            {mesaSelecionada.status === 'disponivel' || abaCriarSecundaria ? (
              <form onSubmit={handleAbrirComanda}>
                <h6 className="text-warning small mb-3 fw-bold">
                  {abaCriarSecundaria ? '➕ Nova Comanda nesta Mesa' : 'Abrir Atendimento'}
                </h6>
                <div className="mb-3">
                  <label className="form-label small mb-1 text-white fw-bold">Nome do Cliente</label>
                  <input
                    type="text"
                    className="form-control form-control-sm bg-dark text-white border-secondary"
                    required
                    value={nomeCliente}
                    onChange={e => setNomeCliente(e.target.value)}
                  />
                </div>
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label small mb-1 text-white fw-bold">Cartão</label>
                    <select
                      className="form-select form-select-sm bg-dark text-white border-secondary"
                      required
                      value={idCartaoSelecionado}
                      onChange={e => setIdCartaoSelecionado(e.target.value)}
                    >
                      <option value="">Escolha...</option>
                      {cartoesLivres
                        .filter(cartao => {
                          const cartaoEmUso = mesas.some(m =>
                            m.pedidos?.some((p: any) => p.cartao?.id === cartao.id)
                          );
                          return !cartaoEmUso;
                        })
                        .map(c => (
                          <option key={c.id} value={c.id}>
                            Cartão {c.numero}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label small mb-1 text-white fw-bold">Pessoas</label>
                    <input
                      type="number"
                      className="form-control form-control-sm bg-dark text-white border-secondary"
                      min="1"
                      value={qtdPessoas}
                      onChange={e => setQtdPessoas(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="border border-secondary rounded p-2 mb-3 bg-secondary bg-opacity-10">
                  <label className="form-label small text-white fw-bold">
                    Adicionar Itens à Comanda
                  </label>
                  <div className="row g-1 mb-2">
                    <div className="col-8">
                      <select
                        className="form-select form-select-sm bg-dark text-white border-secondary"
                        value={idProdutoSelecionado}
                        onChange={e => setIdProdutoSelecionado(e.target.value)}
                      >
                        <option value="">Produto...</option>
                        {produtos.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.nome} - {formatarReal.format(p.preco)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-4">
                      <input
                        type="number"
                        className="form-control form-control-sm bg-dark text-white border-secondary"
                        min="1"
                        value={qtdProduto}
                        onChange={e => setQtdProduto(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm w-100 fw-bold text-dark"
                    onClick={adicionarAoCarrinho}
                  >
                    ➕ Adicionar Item
                  </button>

                  {itensCarrinho.length > 0 && (
                    <div className="mt-2 border-top border-secondary pt-2">
                      {itensCarrinho.map((item, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center text-white small py-1"
                        >
                          <span>
                            <span className="text-warning fw-bold">{item.qtd}x</span> {item.nome}
                          </span>
                          <div className="d-flex align-items-center gap-2">
                            <span className="text-white" style={{ fontSize: '0.75rem' }}>
                              {formatarReal.format(item.preco * item.qtd)}
                            </span>
                            <button
                              type="button"
                              className="btn-close btn-close-white btn-sm"
                              style={{ fontSize: '0.5rem' }}
                              onClick={() =>
                                setItensCarrinho(itensCarrinho.filter((_, i) => i !== index))
                              }
                            />
                          </div>
                        </div>
                      ))}
                      <div className="d-flex justify-content-between text-warning fw-bold small mt-2 pt-2 border-top border-secondary">
                        <span>Total do Pedido:</span>
                        <span>
                          {formatarReal.format(
                            itensCarrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0)
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="d-flex gap-2">
                  {abaCriarSecundaria && (
                    <button
                      type="button"
                      className="btn btn-outline-light btn-sm w-50"
                      onClick={() => setAbaCriarSecundaria(false)}
                    >
                      Voltar
                    </button>
                  )}
                  <button
                    type="submit"
                    className={`btn btn-success btn-sm fw-bold ${abaCriarSecundaria ? 'w-50' : 'w-100'}`}
                    disabled={enviando}
                  >
                    {enviando ? 'Gravando...' : 'Confirmar Abertura'}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small text-white">Comandas ativas:</span>
                  <BotaoComanda 
                    variant="warning" 
                    style={{ height: '32px', fontSize: '0.8rem' }}
                    onClick={() => {
                      setAbaCriarSecundaria(true);
                      limparFormularioEdicao();
                    }}
                  >
                    ➕ Nova Comanda
                  </BotaoComanda>
                </div>

                {mesaSelecionada.pedidos?.map((pedido: any) => {
                  const totalDoCliente = pedido.itens.reduce(
                    (acc: number, it: any) => acc + it.valorItem * it.qtdItem,
                    0
                  );
                  const estaEditando = pedidoIdSendoEditado === pedido.id;

                  return (
                    <div
                      key={pedido.id}
                      className="bg-secondary bg-opacity-25 rounded p-2 mb-3 border border-secondary"
                    >
                      <div className="d-flex justify-content-between align-items-start small fw-bold text-warning">
                        <span>{pedido.cliente}</span>
                        <span>Cartão: {pedido.cartao?.numero || '-'}</span>
                      </div>
                      <div
                        className="my-2 border-top border-secondary pt-1"
                        style={{ maxHeight: '110px', overflowY: 'auto' }}
                      >
                        {pedido.itens.length === 0 ? (
                          <p className="text-white text-center m-0" style={{ fontSize: '0.7rem' }}>
                            Nenhum item lançado.
                          </p>
                        ) : (
                          pedido.itens.map((it: any, idx: number) => (
                            <div
                              key={idx}
                              className="d-flex justify-content-between align-items-center text-white mb-2 p-2 rounded bg-dark bg-opacity-25 border border-secondary border-opacity-20"
                              style={{ fontSize: '0.9rem' }}
                            >
                              <span>
                                <strong className="text-warning">{it.qtdItem}x</strong> {it.item.nome}
                              </span>
                              <div className="d-flex align-items-center gap-3">
                                <span>{formatarReal.format(it.valorItem * it.qtdItem)}</span>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center p-2 rounded-3"
                                  title="Remover item da comanda"
                                  style={{ width: '36px', height: '36px', fontSize: '1.1rem', borderWidth: '1px', flexShrink: 0}}
                                  onClick={() => handleRemoverItem(pedido.id, it.item.id, it.item.nome)}
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {estaEditando && (
                        <div className="mt-2 p-2 border border-warning rounded bg-dark mb-2">
                          <label
                            className="form-label text-warning small fw-bold m-0 mb-1"
                            style={{ fontSize: '0.75rem' }}
                          >
                            Lançar novos itens:
                          </label>
                          <div className="row g-1 mb-2">
                            <div className="col-8">
                              <select
                                className="form-select form-select-sm bg-secondary text-white border-secondary"
                                value={idProdutoEdicao}
                                onChange={e => setIdProdutoEdicao(e.target.value)}
                              >
                                <option value="">Produto...</option>
                                {produtos.map(p => (
                                  <option key={p.id} value={p.id}>
                                    {p.nome}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-4">
                              <input
                                type="number"
                                className="form-control form-control-sm bg-secondary text-white border-secondary"
                                min="1"
                                value={qtdProdutoEdicao}
                                onChange={e => setQtdProdutoEdicao(Number(e.target.value))}
                              />
                            </div>
                          </div>
                          <BotaoComanda
                            variant="warning"
                            className="w-100 mb-3"
                            onClick={adicionarAoCarrinhoEdicao}
                          >
                            ➕ Inserir na Lista
                          </BotaoComanda>

                          {itensCarrinhoEdicao.map((item, idx) => (
                            <div
                              key={idx}
                              className="text-white d-flex justify-content-between align-items-center bg-secondary bg-opacity-25 px-1 py-0.5 rounded mb-1"
                              style={{ fontSize: '0.7rem' }}
                            >
                              <span>
                                <span className="text-warning fw-bold">{item.qtd}x</span> {item.nome}
                              </span>
                              <button
                                type="button"
                                className="btn-close btn-close-white"
                                style={{ fontSize: '0.4rem', padding: '0.2rem' }}
                                onClick={() =>
                                  setItensCarrinhoEdicao(itensCarrinhoEdicao.filter((_, i) => i !== idx))
                                }
                              />
                            </div>
                          ))}

                          <div className="d-flex gap-2 mt-2">
                            <BotaoComanda 
                              variant="outline-light" 
                              className="w-50" 
                              onClick={limparFormularioEdicao}
                            >
                              Cancelar
                            </BotaoComanda>
                            
                            <BotaoComanda 
                              variant="success" 
                              className="w-50"
                              disabled={enviando || itensCarrinhoEdicao.length === 0}
                              onClick={() => handleSalvarNovosItens(pedido.id)}
                            >
                              {enviando ? 'Salvando...' : '💾 Salvar'}
                            </BotaoComanda>
                          </div>
                        </div>
                      )}

                      <div className="d-flex justify-content-between align-items-center pt-2 border-top border-secondary">
                        <span className="small text-white fw-bold" style={{ fontSize: '0.95rem' }}>
                          Total: {formatarReal.format(totalDoCliente)}
                        </span>
                      </div>

                      <div className="d-flex flex-column gap-2 mt-2">
                        {!estaEditando && (
                          <BotaoComanda
                            variant="warning"
                            className="w-100"
                            onClick={() => {
                              setPedidoIdSendoEditado(pedido.id);
                              setItensCarrinhoEdicao([]);
                            }}
                          >
                            ➕ Adicionar novo item
                          </BotaoComanda>
                        )}

                        {!estaEditando && podeEncerrar && (
                          <BotaoComanda
                            type="button"
                            variant="danger"
                            className="w-100"
                            onClick={() => handlePagarComanda(pedido.id)}
                          >
                            💵 Pagar e Encerrar Conta
                          </BotaoComanda>
                        )}
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
  );
}