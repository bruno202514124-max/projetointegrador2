import axios from 'axios';

export const baseURL = 'http://localhost:2000/';

export const api = axios.create({
  baseURL: baseURL,
});

// api.interceptors.request.use(config => {
//    const token = localStorage.getItem('token');

//    if (token) {
//       if (config.headers) config.headers.Authorization = 'Bearer ' + token;
//    }

//    return config;
// });

// export const routerUrlObject = {
//    pathname: '/',
//    query: { auth: false },
// };

// export function showErrorMessage(errorMessage: string) {
//    console.log(errorMessage);
//    Swal.fire('Algo deu errado...', errorMessage, 'error');
// }
