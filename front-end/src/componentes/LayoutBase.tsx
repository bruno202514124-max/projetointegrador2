import Header from '@/componentes/Header';
import styles from '@/css/base.module.css';

type LayoutBaseProps = {
  titulo: string;
  subtitulo?: string;
  children: React.ReactNode;
};

export default function LayoutBase({ titulo, subtitulo, children }: LayoutBaseProps) {
  return (
    <>
      <Header />

      <main className={`container-fluid ${styles.pageContainer}`}>
        <h1 className={styles.pageTitle}>{titulo}</h1>
        {subtitulo && <p className={styles.pageSubtitle}>{subtitulo}</p>}

        {children}
      </main>
    </>
  );
}
