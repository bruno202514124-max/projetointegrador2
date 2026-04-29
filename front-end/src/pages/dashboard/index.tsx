import LayoutBase from '@/componentes/LayoutBase';
import styles from '@/css/base.module.css';

export default function Dashboard() {
  return (
    <LayoutBase titulo="Dashboard" subtitulo="Base para indicadores do sistema.">
      <div className={styles.cardBase}>
        <h2 className={styles.sectionTitle}>Dashboard analítico</h2>
        <p className={styles.helpText}>Aqui podem entrar gráficos de comandas, cozinha, bar e faturamento.</p>
      </div>
    </LayoutBase>
  );
}
