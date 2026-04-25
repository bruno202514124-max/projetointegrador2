import { api } from '@/api';
import estilo from '@/css/estilo.module.css';
import Head from 'next/head';
import Swal from 'sweetalert2';

export default function Home() {
  function testeUsuarios() {
    // alert('clicou');

    const novoUsuario = { nome: 'Retaguarda', senha: 'Retaguarda' };

    api
      .post('usuarios/login', novoUsuario, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => {
        console.log(res);

        Swal.fire('Sucesso!', '', 'success');
      })
      .catch(error => {
        console.log(error);

        // if (error.request.status === 401) {
        //   Swal.fire('Operação não autorizada', 'Redirecionando para a tela de login...', 'error').then(
        //     () => {
        //       localStorage.removeItem('atual-usuario');
        //       navigate('/');
        //     }
        //   );
        // }

        Swal.fire('Algo deu errado...', error.message, 'error');
      });
  }

  return (
    <>
      <Head>
        <title>Projeto Integrador 2</title>
      </Head>

      <div>
        <div className={estilo.container}>
          <h1>Olá, mundo!</h1>
          <button type="button" className="btn btn-primary" onClick={testeUsuarios}>
            Clique aqui
          </button>
        </div>
      </div>
    </>
  );
}
