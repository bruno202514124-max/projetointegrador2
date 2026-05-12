import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import styles from '@/css/base.module.css';

export default function GraficoVendasSemana() {
  const dados = [
    { dia: 'Seg', vendas: 30 },
    { dia: 'Ter', vendas: 45 },
    { dia: 'Qua', vendas: 60 },
    { dia: 'Qui', vendas: 40 },
    { dia: 'Sex', vendas: 80 },
    { dia: 'Sáb', vendas: 95 },
    { dia: 'Dom', vendas: 70 },
  ];

  return (
    <div className={styles.cardBase}>
      <h5 className={styles.sectionTitle}>Vendas da Semana</h5>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados}>
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111',
              border: '1px solid #333',
              borderRadius: '8px'
            }}
          />
          <Bar dataKey="vendas" fill="#f4b942" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}