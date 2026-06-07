/* eslint-disable react-hooks/exhaustive-deps */
import { api } from '@/api';
import LayoutBase from '@/componentes/LayoutBase';
import styles from '@/css/base.module.css';
import { tratarErro } from '@/utils/tratarErro';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';

interface Mesa {
  id: string;
  numero: string;
}

interface Cartao {
  id: string;
  numero: string;
}

interface Item {
  id: string;
  nome: string;
  preco: number;
  bebida: boolean;
}

interface ItemPedido {
  id: string;
  qtd: number;
}

interface PedidoAtivo {
  id: string;
  cliente: string;
  pessoas: number;
  itens: {
    valorItem: number;
    qtdItem: number;
    item: Item;
  }[];
  cartao: {
    id: string;
    numero: string;
    mesa: Mesa | null;
  } | null;
}

export default function CadastroPedidos() {
  const router = useRouter();
  const formatarReal = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [cartoes, setCartoes] = useState<Cartao[]>([]);
  const [itens, setItens] = useState<Item[]>([]);
  const [pedidos, setPedidos] = useState<PedidoAtivo[]>([]);

  const [idMesa, setIdMesa] = useState('');
  const [idCartao, setIdCartao] = useState('');
  const [cliente, setCliente] = useState('');
  const [pessoas, setPessoas] = useState(1);
  const [idItemSelecionado, setIdItemSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [itensPedido, setItensPedido] = useState<ItemPedido[]>([]);
  const [salvando, setSalvando] = useState(false);

  const itensResumo = useMemo(() => {
    return itensPedido.map(itemPedido => ({
      ...itemPedido,
      item: itens.find(item => item.id == itemPedido.id),
    }));
  }, [itensPedido, itens]);

  const subtotal = useMemo(() => {
    return itensResumo.reduce((total, itemResumo) => {
      return total + (itemResumo.item?.preco || 0) * itemResumo.qtd;
    }, 0);
  }, [itensResumo]);

  function carregarDadosIniciais() {
    Promise.all([api.get('/mesas/'), api.get('/cartoes/'), api.get('/itens/'), api.get('/pedidos/')])
      .then(([resMesas, resCartoes, resItens, resPedidos]) => {
        setMesas(resMesas.data);
        setCartoes(resCartoes.data);
        setItens(resItens.data);
        setPedidos(resPedidos.data);

        if (resMesas.data.length > 0) setIdMesa(resMesas.data[0].id);
        if (resCartoes.data.length > 0) setIdCartao(resCartoes.data[0].id);
        if (resItens.data.length > 0) setIdItemSelecionado(resItens.data[0].id);
      })
      .catch(error => {
        tratarErro(error, router);
      });
  }

  function limparFormulario() {
    setCliente('');
    setPessoas(1);
    setQuantidade(1);
    setItensPedido([]);

    if (mesas.length > 0) setIdMesa(mesas[0].id);
    if (cartoes.length > 0) setIdCartao(cartoes[0].id);
    if (itens.length > 0) setIdItemSelecionado(itens[0].id);
  }

  function adicionarItem() {
    if (!idItemSelecionado) {
      Swal.fire('Selecione um item.', '', 'error');
      return;
    }

    if (quantidade <= 0) {
      Swal.fire('Informe uma quantidade válida.', '', 'error');
      return;
    }

    setItensPedido(prev => {
      const itemJaAdicionado = prev.find(item => item.id == idItemSelecionado);

      if (itemJaAdicionado) {
        return prev.map(item =>
          item.id == idItemSelecionado ? { ...item, qtd: item.qtd + quantidade } : item
        );
      }

      return [...prev, { id: idItemSelecionado, qtd: quantidade }];
    });

    setQuantidade(1);
  }

  function removerItem(id: string) {
    setItensPedido(prev => prev.filter(item => item.id != id));
  }

  function enviarPedido() {
    if (!idMesa || !idCartao || cliente.trim() == '' || pessoas <= 0 || itensPedido.length == 0) {
      Swal.fire(
        'Preencha todos os campos.',
        'Informe mesa, cartão, cliente, pessoas e pelo menos um item.',
        'error'
      );
      return;
    }

    setSalvando(true);

    api
      .post('/pedidos/criar', {
        idMesa,
        idCartao,
        cliente,
        pessoas,
        itens: itensPedido,
      })
      .then(() => {
        Swal.fire('Pedido criado com sucesso!', '', 'success');
        limparFormulario();
        return api.get('/pedidos/');
      })
      .then(res => {
        setPedidos(res.data);
      })
      .catch(error => {
        tratarErro(error, router);
      })
      .finally(() => {
        setSalvando(false);
      });
  }

  useEffect(() => {
    carregarDadosIniciais();
  }, []);

  return (
    <LayoutBase
      titulo="Cadastro de Pedidos"
      subtitulo="Cadastro de pedidos integrado com mesas, cartões e itens do sistema."
    >
      <div className="row g-4">
        <div className="col-lg-8">
          <section className={styles.cardBase}>
            <h2 className={styles.sectionTitle}>Dados da Mesa / Cartão</h2>

            <div className="row g-3">
              <div className="col-md-3">
                <label className={styles.formLabel}>Mesa</label>
                <select
                  className="form-select"
                  value={idMesa}
                  onChange={e => setIdMesa(e.currentTarget.value)}
                >
                  {mesas.map(mesa => (
                    <option key={mesa.id} value={mesa.id}>
                      Mesa {mesa.numero}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className={styles.formLabel}>Cartão</label>
                <select
                  className="form-select"
                  value={idCartao}
                  onChange={e => setIdCartao(e.currentTarget.value)}
                >
                  {cartoes.map(cartao => (
                    <option key={cartao.id} value={cartao.id}>
                      Cartão {cartao.numero}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className={styles.formLabel}>Cliente</label>
                <input
                  className="form-control"
                  placeholder="Nome do cliente"
                  value={cliente}
                  onChange={e => setCliente(e.currentTarget.value)}
                />
              </div>

              <div className="col-md-2">
                <label className={styles.formLabel}>Pessoas</label>
                <input
                  className="form-control"
                  type="number"
                  min="1"
                  value={pessoas}
                  onChange={e => setPessoas(Number(e.currentTarget.value))}
                />
              </div>
            </div>
          </section>

          <section className={`${styles.cardBase} mt-4`}>
            <h2 className={styles.sectionTitle}>Itens do Pedido</h2>

            <div className="row g-3">
              <div className="col-md-6">
                <label className={styles.formLabel}>Produto</label>
                <select
                  className="form-select"
                  value={idItemSelecionado}
                  onChange={e => setIdItemSelecionado(e.currentTarget.value)}
                >
                  {itens.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.nome} - {formatarReal.format(item.preco)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className={styles.formLabel}>Quantidade</label>
                <input
                  className="form-control"
                  type="number"
                  min="1"
                  value={quantidade}
                  onChange={e => setQuantidade(Number(e.currentTarget.value))}
                />
              </div>

              <div className="col-md-3 d-flex align-items-end">
                <button className="btn btn-warning w-100 fw-bold" onClick={adicionarItem}>
                  Adicionar
                </button>
              </div>
            </div>
          </section>

          <section className={`${styles.cardBase} mt-4`}>
            <h2 className={styles.sectionTitle}>Pedidos Ativos</h2>

            {pedidos.length == 0 && <p className={styles.helpText}>Nenhum pedido ativo encontrado.</p>}

            <div className="d-flex flex-column gap-3">
              {pedidos.map(pedido => (
                <div key={pedido.id} className="border border-secondary rounded p-3">
                  <div className="d-flex justify-content-between gap-2 flex-wrap">
                    <strong>{pedido.cliente}</strong>
                    <span>
                      Mesa {pedido.cartao?.mesa?.numero || '-'} / Cartao{' '}
                      {pedido.cartao?.numero || '-'}
                    </span>
                  </div>
                  <small>{pedido.pessoas} pessoa(s)</small>
                  <ul className="mb-0 mt-2">
                    {pedido.itens.map((itemPedido, index) => (
                      <li key={`${pedido.id}-${itemPedido.item.id}-${index}`}>
                        {itemPedido.qtdItem}x {itemPedido.item.nome} -{' '}
                        {formatarReal.format(itemPedido.valorItem * itemPedido.qtdItem)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-lg-4">
          <section className={styles.cardBase}>
            <h2 className={styles.sectionTitle}>Resumo</h2>

            {itensResumo.length == 0 && <p className={styles.helpText}>Nenhum item adicionado ainda.</p>}

            <div className="d-flex flex-column gap-2">
              {itensResumo.map(itemResumo => (
                <div
                  key={itemResumo.id}
                  className="d-flex justify-content-between align-items-center gap-2"
                >
                  <div>
                    <strong>{itemResumo.item?.nome}</strong>
                    <p className="m-0">
                      {itemResumo.qtd}x {formatarReal.format(itemResumo.item?.preco || 0)}
                    </p>
                  </div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removerItem(itemResumo.id)}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>

            <hr className="border-secondary" />

            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <strong>{formatarReal.format(subtotal)}</strong>
            </div>

            <div className="d-flex justify-content-between mt-2">
              <span>Total</span>
              <strong>{formatarReal.format(subtotal)}</strong>
            </div>

            <button
              className="btn btn-warning w-100 fw-bold mt-4"
              onClick={enviarPedido}
              disabled={salvando}
            >
              {salvando ? 'Enviando...' : 'Enviar Pedido'}
            </button>
          </section>
        </div>
      </div>
    </LayoutBase>
  );
}
