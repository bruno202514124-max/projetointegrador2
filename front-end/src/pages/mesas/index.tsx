/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
import { api } from '@/api';
import LayoutBase from '@/componentes/LayoutBase';
import CardMesa from '@/componentes/mesas/CardMesa';
import ModalDetalhesMesa from '@/componentes/mesas/ModalDetalhesMesa';
import styles from '@/css/base.module.css';
import { tratarErro } from '@/utils/tratarErro';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface ItemPedido {
  item: { nome: string };
  qtdItem: number;
  valorItem: number;
}

export interface PedidoAtivo {
  id: string;
  cliente: string;
  pessoas: number;
  itens: ItemPedido[];
  cartao: {
    id: string;
    numero: number;
    mesa: { id: string; numero: number } | null;
  } | null;
}

export interface Mesa {
  id: string;
  numero: number;
  status: 'disponivel' | 'ocupada';
  pedidos?: PedidoAtivo[];
}

export interface CartaoDisponivel {
  id: string;
  numero: number;
}

export interface Produto {
  id: string;
  nome: string;
  preco: number;
}

const formatarReal = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export default function Mesas() {
  const router = useRouter();
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [cartoesLivres, setCartoesLivres] = useState<CartaoDisponivel[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null);
  const [podeEncerrar, setPodeEncerrar] = useState(false);

  useEffect(() => {
    const usuarioStorage = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');

    // Se não houver token ou usuário cadastrado, redireciona para o login
    if (!token || !usuarioStorage || usuarioStorage === 'undefined') {
      window.location.href = '/';
      return;
    }

    try {
      const usuario = JSON.parse(usuarioStorage);
      const cargo = usuario.permissao || '';

      // Se a permissão NÃO for frente, este usuário GANHA permissão de encerramento
      if (cargo.toLowerCase() !== 'frente') {
        setPodeEncerrar(true);
      }
    } catch (erro) {
      console.error('Erro ao mapear permissões do usuário:', erro);
    }

    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setCarregando(true);

      const [resMesas, resCartoes, resPedidos, resProdutos] = await Promise.all([
        api.get('mesas'),
        api.get('cartoes'),
        api.get('pedidos'),
        api.get('itens'),
      ]);

      setProdutos(resProdutos.data || []);
      const listaDePedidos = resPedidos.data || [];

      const mesasFormatadas = resMesas.data.map((mesa: Mesa) => {
        const pedidosDaMesa = listaDePedidos.filter(
          (pedido: PedidoAtivo) => pedido.cartao?.mesa?.id === mesa.id
        );
        return {
          ...mesa,
          status: pedidosDaMesa.length > 0 ? 'ocupada' : mesa.status,
          pedidos: pedidosDaMesa,
        };
      });

      const mesasOrdenadas = [...mesasFormatadas].sort(
        (a: Mesa, b: Mesa) => Number(a.numero) - Number(b.numero)
      );
      
      setMesas(mesasOrdenadas);
      setCartoesLivres(resCartoes.data || []);

      if (mesaSelecionada) {
        const mesaAtualizada = mesasOrdenadas.find((m: Mesa) => m.id === mesaSelecionada.id);
        if (mesaAtualizada) setMesaSelecionada(mesaAtualizada);
      }
    } catch (erro) {
      console.error('Erro ao carregar dados do painel:', erro);
      tratarErro(erro, router);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <LayoutBase titulo="Mesas" subtitulo="Painel Operacional de Atendimento">
      <div className={styles.cardBase}>
        <h2 className={styles.sectionTitle}>Controle de mesas</h2>

        {carregando ? (
          <p className={styles.helpText}>Carregando painel...</p>
        ) : (
          <div className="row g-2 mt-3">
            {mesas.map(mesa => (
              <div key={mesa.id} className="col-6 col-sm-4 col-md-3 col-xl-custom mb-3 px-1">
                <CardMesa
                  numero={mesa.numero}
                  status={mesa.status}
                  onClick={() => setMesaSelecionada(mesa)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {mesaSelecionada && (
        <ModalDetalhesMesa
          mesaSelecionada={mesaSelecionada}
          mesas={mesas}
          cartoesLivres={cartoesLivres}
          produtos={produtos}
          formatarReal={formatarReal}
          fecharModal={() => setMesaSelecionada(null)}
          carregarDados={carregarDados}
          tratarErro={tratarErro}
          router={router}
          podeEncerrar={podeEncerrar}
        />
      )}
    </LayoutBase>
  );
}