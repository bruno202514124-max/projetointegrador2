/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { api } from '@/api';
import Botao from '@/componentes/Botao';
import LayoutBase from '@/componentes/LayoutBase';
import Card from '@/componentes/dashborad/Cards';
import GraficoLucroMensal from '@/componentes/dashborad/GraficoLucroMensal';
import GraficoVendasSemana from '@/componentes/dashborad/GraficoVendasSemana';
import ProdutosMaisVendidos from '@/componentes/dashborad/ProdutosMaisVendidos';
import { tratarErro } from '@/utils/tratarErro';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');

  const dataAtualString = `${ano}-${mes}-${dia}`;
  const [dataSelecionada, setDataSelecionada] = useState(dataAtualString);
  const [anoSelecionado, mesSelecionado, diaSelecionado] = dataSelecionada.split('-');
  const [rankProdutos, setRankProdutos] = useState<
    {
      id: string;
      nome: string;
      preco: number;
      qtd: number;
    }[]
  >([]);

  const [carregando, setCarregando] = useState(true);
  const [dados, setDados] = useState({
    lucroMensal: 0,
    lucroDiario: 0,
    vendasMensais: 0,
    vendas: 0,
  });
  const inputDataRef = useRef<HTMLInputElement>(null);

  function retornaDataFormatada() {
    const dataFormatada = `${diaSelecionado} de ${new Date(
      Number(anoSelecionado),
      Number(mesSelecionado) - 1,
      Number(diaSelecionado)
    ).toLocaleString('pt-BR', {
      month: 'long',
    })} de ${anoSelecionado}`;

    return dataFormatada;
  }

  useEffect(() => {
    const usuarioStorage = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');

    if (!token || !usuarioStorage || usuarioStorage === 'undefined') {
      window.location.href = '/';
      return;
    }

    try {
      const usuario = JSON.parse(usuarioStorage);
      const cargo = usuario.permissao || '';

      if (cargo.toLowerCase() !== 'administrador') {
        alert('Acesso negado! Apenas administradores possuem acesso ao Dashboard.');
        window.location.href = '/mesas';
        return;
      }

      setCarregando(false);
    } catch (erro) {
      console.error('Erro ao validar credenciais:', erro);
      window.location.href = '/';
    }
  }, []);

  const carregarDados = async () => {
    try {
      const [ano, mes, dia] = dataSelecionada.split('-');

      const respostaDia = await api.post('/pedidos/relatorioDia', {
        diaDoMes: Number(dia),
        mes: Number(mes) - 1,
        ano: Number(ano),
      });

      const respostaMes = await api.post('/pedidos/relatorioMes', {
        mes: Number(mes) - 1,
        ano: Number(ano),
      });

      setDados({
        lucroMensal: respostaMes.data.lucro ?? 0,
        lucroDiario: respostaDia.data.lucro ?? 0,
        vendasMensais: respostaMes.data.vendas ?? 0,
        vendas: respostaDia.data.vendas ?? 0,
      });

      setRankProdutos(respostaMes.data.rank);
    } catch (erro) {
      tratarErro(erro, router);
    }
  };

  useEffect(() => {
    if (!carregando) {
      carregarDados();
    }
  }, [dataSelecionada, carregando]);

  if (carregando) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center bg-dark text-light">
        <h5>Verificando credenciais de acesso...</h5>
      </div>
    );
  }

  return (
    <LayoutBase titulo="Dashboard" subtitulo="Visão geral do sistema">
      <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h3
            style={{
              fontWeight: 800,
              marginBottom: '4px',
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            }}
          >
            Bulldog Brewer
          </h3>

          <p
            style={{
              color: '#bdbdbd',
              marginBottom: 0,
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
            }}
          >
            Dados referentes a {retornaDataFormatada()}
          </p>
        </div>

        <Botao
          onClick={() => inputDataRef.current?.showPicker()}
          className="d-flex align-items-center gap-3"
        >
          <div
            style={{
              backgroundColor: '#f4b942',
              color: '#000',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '14px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              cursor: 'pointer',
              minWidth: '190px',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            <span>{dataSelecionada.split('-').reverse().join('/')}</span>

            <span>📅</span>

            <input
              ref={inputDataRef}
              type="date"
              value={dataSelecionada}
              onChange={e => setDataSelecionada(e.target.value)}
              style={{
                position: 'absolute',
                opacity: 0,
                pointerEvents: 'none',
              }}
            />
          </div>
        </Botao>
      </div>

      <div className="row g-4">
        <div className="col-md-3">
          <Card
            titulo="Lucro Mensal"
            valor={`R$ ${dados.lucroMensal.toLocaleString('pt-BR')}`}
            cor="text-success"
          />
        </div>

        <div className="col-md-3">
          <Card
            titulo="Lucro Diário"
            valor={`R$ ${dados.lucroDiario.toLocaleString('pt-BR')}`}
            cor="text-success"
          />
        </div>

        <div className="col-md-3">
          <Card titulo="Vendas Mensais" valor={`${dados.vendasMensais.toLocaleString('pt-BR')}`} />
        </div>

        <div className="col-md-3">
          <Card titulo="Vendas do Dia" valor={`${dados.vendas.toLocaleString('pt-BR')}`} />
        </div>
      </div>

      <div className="row mt-5 g-4">
        <div className="col-md-6 d-flex flex-column">
          <div className="h-100 w-100">
            <GraficoVendasSemana dataSelecionada={dataSelecionada} />
          </div>
        </div>

        <div className="col-md-6 d-flex flex-column">
          <div className="h-100 w-100">
            <GraficoLucroMensal dataSelecionada={dataSelecionada} />
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-12">
          <ProdutosMaisVendidos produtos={rankProdutos} />
        </div>
      </div>
    </LayoutBase>
  );
}
