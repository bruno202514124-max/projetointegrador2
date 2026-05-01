import LayoutBase from '@/componentes/LayoutBase';
import styles from '@/css/base.module.css';

export default function Mesas() {
  return (
    <LayoutBase titulo="Mesas" subtitulo="Base para controle de mesas.">
      <div className={styles.cardBase}>
        <h2 className={styles.sectionTitle}>Controle de mesas</h2>
        <p className={styles.helpText}>Página base para ser desenvolvida pelo grupo.</p>
      </div>
    </LayoutBase>
  );
}
