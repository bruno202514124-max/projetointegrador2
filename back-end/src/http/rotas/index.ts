import { Router } from 'express';
import { rotasUsuarios } from './usuarios.routes';

const rotas = Router();

rotas.use('/usuarios', rotasUsuarios);

export { rotas };
