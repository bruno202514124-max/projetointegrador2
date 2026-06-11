import LayoutBase from '@/componentes/LayoutBase';
import Card from '@/componentes/dashborad/Cards';
import GraficoVendasSemana from '@/componentes/dashborad/GraficoVendasSemana';
import GraficoLucroMensal from '@/componentes/dashborad/GraficoLucroMensal';
import ProdutosMaisVendidos from '@/componentes/dashborad/ProdutosMaisVendidos';
import Botao from '@/componentes/Botao';
import styles from '@/css/base.module.css';
import { useEffect, useRef, useState } from 'react';
import { api } from '@/api';

export default function Dashboard() {
  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');

  const dataAtualString = `${ano}-${mes}-${dia}`;
  const [dataSelecionada, setDataSelecionada] = useState(dataAtualString);

  const [anoSelecionado, mesSelecionado, diaSelecionado] = dataSelecionada.split('-');

  const dataFormatada = `${diaSelecionado} de ${new Date(
    Number(anoSelecionado),
    Number(mesSelecionado) - 1,
    Number(diaSelecionado)
  ).toLocaleString('pt-BR', {
    month: 'long',
  })} de ${anoSelecionado}`;

  const inputDataRef = useRef<HTMLInputElement>(null);

    const [dados, setDados] = useState({
    lucroMensal: 0,
    lucroDiario: 0,
    vendasMensais: 0,
    vendas: 0,
  });

    const [rankProdutos, setRankProdutos] = useState<
      {
        id: string;
        nome: string;
        preco: number;
        qtd: number;
      }[]
    >([]);

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
    console.error('Erro ao carregar dashboard:', erro);
  }
};

  useEffect(() => {
  carregarDados();
}, [dataSelecionada]);

  return (
    <LayoutBase
      titulo="Dashboard"
      subtitulo="Visão geral do sistema"
    >
      {/* TOPO */}
      <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
  
      {/* ESQUERDA */}
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
          Dados referentes a {dataFormatada}
        </p>
      </div>

      {/* DIREITA */}
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
            <span>
              {dataSelecionada
                .split('-')
                .reverse()
                .join('/')}
            </span>

            <span>📅</span>

            <input
              ref={inputDataRef}
              type="date"
              value={dataSelecionada}
              onChange={(e) =>
                setDataSelecionada(e.target.value)
              }
              style={{
                position: 'absolute',
                opacity: 0,
                pointerEvents: 'none',
              }}
            />
          </div>
        </Botao>
      </div>
      
      {/* CARDS */}
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
          <Card
            titulo="Vendas Mensais"
            valor={`${dados.vendasMensais.toLocaleString('pt-BR')}`}
          />
        </div>

        <div className="col-md-3">
          <Card
            titulo="Vendas do Dia"
            valor={`${dados.vendas.toLocaleString('pt-BR')}`}
          />
        </div>
      </div>

      {/* GRÁFICOS */}
      <div className="row mt-5 g-4">
        <div className="col-md-6 d-flex flex-column">
          <div className="h-100 w-100">
          <GraficoVendasSemana dataSelecionada={dataSelecionada} />
        </div>
       </div> 

        <div className="col-md-6 d-flex flex-column">
          <div className="h-100 w-100">
          <GraficoLucroMensal />
          </div>
        </div>
      </div>

       {/* PRODUTOS MAIS VENDIDOS */}
      <div className="row mt-5">
        <div className="col-md-12">
          <ProdutosMaisVendidos produtos={rankProdutos} />
        </div>
      </div>
      
    </LayoutBase>
  );
}