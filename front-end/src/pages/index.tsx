import LayoutBase from '@/componentes/LayoutBase';
import styles from '@/css/base.module.css';

export default function Home() {
  return (
    <LayoutBase
      titulo="Principal"
      subtitulo="Base inicial do sistema web da Bulldog Brewer."
    >
      <div className={styles.cardBase}>
        <h2 className={styles.sectionTitle}>Página inicial</h2>
        <p className={styles.helpText}>
          Esta é uma base simples para o projeto. Use o menu superior para acessar as páginas.
        </p>
      </div>
    </LayoutBase>
  );
}
