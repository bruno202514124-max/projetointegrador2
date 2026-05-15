import { Router } from 'express';
import { rotasUsuarios } from './usuarios.routes';
import { rotasItens } from './itens.routes';

const rotas = Router();

rotas.use('/usuarios', rotasUsuarios);
rotas.use('/itens', rotasItens);

export { rotas };
