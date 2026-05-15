import Botao from '@/componentes/Botao';
import LayoutBase from '@/componentes/LayoutBase';
import Card from '@/componentes/dashborad/Cards';
import GraficoLucroMensal from '@/componentes/dashborad/GraficoLucroMensal';
import GraficoVendasSemana from '@/componentes/dashborad/GraficoVendasSemana';
import ProdutosMaisVendidos from '@/componentes/dashborad/ProdutosMaisVendidos';
import { useRef, useState } from 'react';

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

  const dados = {
    lucroMensal: 54840,
    lucroDiario: 14840,
    despesas: 40000,
    vendas: 150,
  };

  return (
    <LayoutBase titulo="Dashboard" subtitulo="Visão geral do sistema">
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
              // cursor: 'pointer',     nao precisa de cursor pointer se a div ta dentro de um botao
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
            titulo="Despesas"
            valor={`R$ ${dados.despesas.toLocaleString('pt-BR')}`}
            cor="text-danger"
          />
        </div>

        <div className="col-md-3">
          <Card titulo="Vendas" valor={`${dados.vendas}`} />
        </div>
      </div>

      {/* GRÁFICOS */}
      <div className="row mt-5">
        <div className="col-md-6">
          <GraficoVendasSemana />
        </div>

        <div className="col-md-6">
          <GraficoLucroMensal />
        </div>
      </div>

      {/* PRODUTOS MAIS VENDIDOS */}
      <div className="row mt-5">
        <div className="col-md-12">
          <ProdutosMaisVendidos />
        </div>
      </div>
    </LayoutBase>
  );
}
