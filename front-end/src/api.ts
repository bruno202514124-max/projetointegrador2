import axios from 'axios';
import Swal from 'sweetalert2';

export const baseURL = 'http://localhost:2000/';

export const api = axios.create({
  baseURL: baseURL,
});

// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');

//   if (token) {
//     if (config.headers) config.headers.Authorization = 'Bearer ' + token;
//   }

//   return config;
// });

export const routerUrlObject = {
  pathname: '/',
  query: { auth: false },
};

export function exibirMensagemDeErro(mensagemDeErro: string) {
  console.log(mensagemDeErro);
  Swal.fire('Algo deu errado...', mensagemDeErro, 'error');
}
