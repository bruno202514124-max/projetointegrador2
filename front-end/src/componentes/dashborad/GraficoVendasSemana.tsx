/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { api } from '@/api';
import styles from '@/css/base.module.css';
import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Props = {
  dataSelecionada: string;
};

export default function GraficoVendasSemana({ dataSelecionada }: Props) {
  const [dados, setDados] = useState<any[]>([]);

  const carregarSemana = async () => {
    try {
      const [ano, mes, dia] = dataSelecionada.split('-');

      const dataBase = new Date(Number(ano), Number(mes) - 1, Number(dia));

      const diaSemana = dataBase.getDay(); // 0 = domingo, 1 = segunda...
      const diffSegunda = diaSemana === 0 ? -6 : 1 - diaSemana;

      const segundaFeira = new Date(dataBase);
      segundaFeira.setDate(dataBase.getDate() + diffSegunda);

      const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

      const dadosSemana = [];

      for (let i = 0; i < 7; i++) {
        const data = new Date(segundaFeira);
        data.setDate(segundaFeira.getDate() + i);

        const resposta = await api.post('/pedidos/relatorioDia', {
          diaDoMes: data.getDate(),
          mes: data.getMonth(),
          ano: data.getFullYear(),
        });

        dadosSemana.push({
          dia: diasSemana[data.getDay()],
          vendas: resposta.data.vendas ?? 0,
        });
      }

      setDados(dadosSemana);
    } catch (erro) {
      console.error('Erro gráfico semana:', erro);
    }
  };

  useEffect(() => {
    carregarSemana();
  }, [dataSelecionada]);

  return (
    <div
      className={styles.cardBase}
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <h5 className={styles.sectionTitle} style={{ marginBottom: '20px' }}>
        Vendas da Semana
      </h5>

      <div style={{ flex: 1, minHeight: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dados}>
            <XAxis dataKey="dia" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111',
                border: '1px solid #333',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="vendas" fill="#f4b942" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
