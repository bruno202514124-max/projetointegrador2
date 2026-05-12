import Header from '@/componentes/Header';
import styles from '@/css/base.module.css';

type LayoutBaseProps = {
  titulo: string;
  subtitulo?: string;
  children: React.ReactNode;
};

export default function LayoutBase({ titulo, subtitulo, children }: LayoutBaseProps) {
  const usuario = 'Luan Silva';
  const status = 'Aberta';

  return (
    <>
      <Header />

      <main className={`container-fluid  ${styles.pageContainer}`}>
        <div className="d-flex justify-content-between">
          <div>
            <h1 className={styles.pageTitle}>{titulo}</h1>
            {subtitulo && <p className={styles.pageSubtitle}>{subtitulo}</p>}
          </div>

          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-4 gap-3">
            <div className="d-flex gap-2 flex-wrap">
              <span>
                Status: <span className="badge badge-open">{status}</span>
              </span>
              <span>Atendente: {usuario}</span>
            </div>
          </div>
        </div>

        {children}
      </main>
    </>
  );
}
