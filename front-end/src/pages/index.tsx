import { api } from '@/api';
import Botao from '@/componentes/Botao';
import estilo from '@/css/estilo.module.css';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function Home() {
  const router = useRouter();

  function testeUsuarios() {
    Swal.fire('Clicou!', 'O botão foi clicado.', 'success').then(() => router.push('/mesas'));

    // const novoUsuario = { nome: 'Retaguarda', senha: 'Retaguarda' };

    // api
    //   .post('usuarios/login', novoUsuario, {
    //     headers: { 'Content-Type': 'application/json' },
    //   })
    //   .then(res => {
    //     console.log(res);

    //     Swal.fire('Sucesso!', '', 'success');
    //   })
    //   .catch(error => {
    //     console.log(error);

    //     if (error.request.status === 401) {
    //       Swal.fire('Operação não autorizada', 'Redirecionando para a tela de login...', 'error').then(
    //         () => {
    //           localStorage.removeItem('atual-usuario');
    //           router.push('/');
    //         }
    //       );
    //     }

    //     Swal.fire('Algo deu errado...', error.message, 'error');
    //   });
  }

  return (
    <>
      <Head>
        <title>Projeto Integrador 2</title>
      </Head>

      <div>
        <div className={estilo.container}>
          <h1>Olá, mundo!</h1>
          <Botao onClick={testeUsuarios} textoInterno="Clique aqui" />
        </div>
      </div>
    </>
  );
}
