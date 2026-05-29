/* eslint-disable @typescript-eslint/no-explicit-any */
import { exibirMensagemDeErro, routerUrlObject } from '@/api';
import { AxiosError } from 'axios';
import { NextRouter } from 'next/router';
import Swal from 'sweetalert2';

export function tratarErro(error: any, router: NextRouter) {
  if (error instanceof AxiosError && error.response?.data.autent === false) {
    Swal.fire(error.response?.data.erro, 'Redirecionando para tela de login...', 'error').then(
      result => {
        if (result.isConfirmed) {
          localStorage.clear();
          router.push(routerUrlObject, '/');
        }
      }
    );
  } else if (error instanceof AxiosError) {
    exibirMensagemDeErro(error.message);
  } else {
    console.log('erro => ', error);
  }
}
