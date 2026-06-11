import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import styles from '@/css/base.module.css';
import { api } from '@/api';
import { useEffect, useState } from 'react';

export default function GraficoLucroMensal() {
  const [dados, setDados] = useState<any[]>([]);

  // Calcula a média automaticamente para desenhar a linha de referência
  const mediaLucro =
  dados.length > 0
    ? dados.reduce((acc, curr) => acc + curr.lucro, 0) / dados.length
    : 0;

const carregarGrafico = async () => {
  try {
    const meses = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];

    const anoAtual = new Date().getFullYear();

    const dadosMeses = [];

    for (let i = 0; i < 12; i++) {
      try {
        const resposta = await api.post('/pedidos/relatorioMes', {
          mes: i,
          ano: anoAtual,
        });

        dadosMeses.push({
          mes: meses[i],
          lucro: resposta.data.lucro || 0,
        });
      } catch {
        dadosMeses.push({
          mes: meses[i],
          lucro: 0,
        });
      }
    }

    setDados(dadosMeses);
  } catch (erro) {
    console.error('Erro ao carregar gráfico mensal:', erro);
  }
};

useEffect(() => {
  carregarGrafico();
}, []);

  return (
    <div 
      className={styles.cardBase} 
      style={{ 
        padding: '20px', 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%' // Força a div a usar toda a altura da coluna do Bootstrap
      }}
    >
      <h5 className={styles.sectionTitle} style={{ marginBottom: '20px' }}>
        Lucro Mensal
      </h5>

        <div style={{ flex: 1, minHeight: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dados} margin={{ top: 20, right: 10, left: 10, bottom: 10 }}>
            {/* Efeitos Especiais em SVG */}
            <defs>
              <linearGradient id="linhaGradiente" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f4b942" />
                <stop offset="100%" stopColor="#4ade80" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#4ade80" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* Linha Analítica de Média */}
            <ReferenceLine
              y={mediaLucro}
              stroke="rgba(255,255,255,0.15)"
              strokeDasharray="4 4"
              label={{ position: 'top', value: 'MÉDIA', fill: '#666', fontSize: 10, fontWeight: 'bold' }}
            />

            <XAxis
              dataKey="mes"
              stroke="#888"
              fontSize={12}
              axisLine={false}
              tickLine={false}
              minTickGap={15}
            />

            <Tooltip
              cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2, strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: 'rgba(20, 20, 20, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid #333',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                padding: '10px 14px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              }}
              itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Lucro']}
              labelStyle={{
                color: '#f4b942',
                marginBottom: '6px',
                display: 'block',
                fontWeight: 800,
                textTransform: 'uppercase',
                fontSize: '12px',
              }}
            />

            {/* Linha principal com gradiente e neon */}
            <Line
              type="linear"
              dataKey="lucro"
              stroke="url(#linhaGradiente)"
              strokeWidth={4}
              style={{ filter: 'url(#glow)' }} /* Aplica a sombra neon */
              dot={{ r: 5, fill: '#1a1a1a', stroke: 'url(#linhaGradiente)', strokeWidth: 2 }}
              activeDot={{ r: 8, fill: '#4ade80', stroke: '#1a1a1a', strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
