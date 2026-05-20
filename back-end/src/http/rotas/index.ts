import { Router } from 'express';
import { rotasUsuarios } from './usuarios.routes';
import { rotasItens } from './itens.routes';
import { rotasPedidos } from './pedidos.routes';
import { rotasCartoes } from './cartoes.routes';

const rotas = Router();

rotas.use('/usuarios', rotasUsuarios);
rotas.use('/itens', rotasItens);
rotas.use('/pedidos', rotasPedidos);
rotas.use('/cartoes', rotasCartoes);

export { rotas };
