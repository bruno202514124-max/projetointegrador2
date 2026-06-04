/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import Header from '@/componentes/Header';
import styles from '@/css/base.module.css';

type LayoutBaseProps = {
  titulo: string;
  subtitulo?: string;
  children: React.ReactNode;
};

type UsuarioLogado = {
  nome: string;
};

export default function LayoutBase({ titulo, subtitulo, children }: LayoutBaseProps) {
  const [usuario, setUsuario] = useState('Usuário');
  const [status, setStatus] = useState('Fechada');

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');

    if (usuarioSalvo) {
      const usuarioConvertido: UsuarioLogado = JSON.parse(usuarioSalvo);
      setUsuario(usuarioConvertido.nome);
    }

    const agora = new Date();
    const hora = agora.getHours();
    const diaSemana = agora.getDay();

    const diaAberto = diaSemana === 0 || diaSemana >= 2;
    const dentroDoHorario = hora >= 19 && hora < 24;

    if (diaAberto && dentroDoHorario) {
      setStatus('Aberta');
    } else {
      setStatus('Fechada');
    }
  }, []);

  return (
    <>
      <Header />

      <main className={`container-fluid ${styles.pageContainer}`}>
        <div className="d-flex justify-content-between">
          <div>
            <h1 className={styles.pageTitle}>{titulo}</h1>
            {subtitulo && <p className={styles.pageSubtitle}>{subtitulo}</p>}
          </div>

          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-4 gap-3">
            <div className="d-flex gap-3 flex-wrap">
              <span className="d-flex gap-1 align-items-center">
                Status:{' '}
                <span className={status === 'Aberta' ? 'badge badge-open' : 'badge bg-danger'}>
                  {status}
                </span>
              </span>

              <span className="d-flex gap-1">
                Atendente: <p className="fw-bold">{usuario}</p>
              </span>
            </div>
          </div>
        </div>

        {children}
      </main>
    </>
  );
}
