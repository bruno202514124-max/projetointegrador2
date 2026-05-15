/* eslint-disable @next/next/no-img-element */
import styles from '@/css/base.module.css';

export default function Login() {
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        {/* LADO ESQUERDO - IMAGEM */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src="/img/bulldog-space.png"
            alt="Bulldog Brewer"
            style={{
              width: '100%',
              height: '100vh',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* LADO DIREITO - LOGIN */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
          <div
            className={styles.cardBase}
            style={{
              maxWidth: '400px',
              width: '100%',
            }}
          >
            {/* LOGO */}
            <div className="text-center mb-0" style={{ marginTop: '20px' }}>
              <img
                src="/img/logo-sem-fundo.png"
                alt="Bulldog Brewer"
                style={{
                  width: '140px',
                  height: '140px',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* TITULO */}
            <h2 className={`${styles.sectionTitle} text-center`} style={{ fontSize: '30px' }}>
              Login
            </h2>

            {/* INPUT ID */}
            <div className="mb-3">
              <input type="text" placeholder="Digite seu ID" className="form-control" />
            </div>

            {/* INPUT SENHA */}
            <div className="mb-3">
              <input type="password" placeholder="Digite sua senha" className="form-control" />
            </div>

            {/* BOTÃO */}
            <button className="btn btn-warning w-100">Entrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
