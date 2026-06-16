'use client';

/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';
import styles from '@/css/base.module.css';

export default function Login() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  async function fazerLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const resposta = await fetch('http://localhost:2000/usuarios/login', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          nome,
          senha,
        }),
      });

      const dados = await resposta.json();

      if (dados && dados.codigo == 400) {
        alert(dados.mensagem);
      }

      if (resposta.ok) {
        localStorage.setItem('token', dados.token);
        localStorage.setItem('usuario', JSON.stringify({ nome }));

        alert('Login realizado com sucesso');

        window.location.href = '/mesas';
      }
    } catch (erro) {
      console.log('erro => ', erro);

      alert('Erro ao conectar com o servidor');
    }
  }

  return (
    <form className="container-fluid" onSubmit={fazerLogin}>
      <div className="row vh-100">
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

        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
          <div
            className={styles.cardBase}
            style={{
              maxWidth: '400px',
              width: '100%',
            }}
          >
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

            <h2 className={`${styles.sectionTitle} text-center`} style={{ fontSize: '30px' }}>
              Login
            </h2>

            <div className="mb-3">
              <input
                type="text"
                placeholder="Digite seu nome"
                className="form-control"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                placeholder="Digite sua senha"
                className="form-control"
                value={senha}
                onChange={e => setSenha(e.target.value)}
              />
            </div>

            <button className="btn btn-warning w-100" type="submit">
              Entrar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
