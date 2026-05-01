import LayoutBase from '@/componentes/LayoutBase';
import styles from '@/css/base.module.css';

export default function Cadastros() {
  return (
    <LayoutBase titulo="Cadastros" subtitulo="Base para cadastros do sistema.">
      <div className={styles.cardBase}>
        <h2 className={styles.sectionTitle}>Central de cadastros</h2>
        <p className={styles.helpText}>Aqui podem entrar cadastros de mesas, cartões, produtos, preços e usuários.</p>
      </div>
    </LayoutBase>
  );
}
