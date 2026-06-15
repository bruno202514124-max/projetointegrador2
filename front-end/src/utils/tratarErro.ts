/* eslint-disable @typescript-eslint/no-explicit-any */
import { exibirMensagemDeErro, routerUrlObject } from '@/api';
import { AxiosError } from 'axios';
import { NextRouter } from 'next/router';
import Swal from 'sweetalert2';

export function tratarErro(error: any, router: NextRouter) {
  if (error instanceof AxiosError && error.response?.status === 401) {
    Swal.fire(error.response?.data.mensagem, 'Redirecionando para tela de login...', 'error').then(
      result => {
        if (result.isConfirmed) {
          localStorage.clear();
          router.push(routerUrlObject, '/');
        }
      }
    );
  } else if (error instanceof AxiosError) {
    exibirMensagemDeErro(error.response?.data.mensagem);
  } else {
    console.log('erro => ', error);
  }
}
