import { Router } from 'express';
import { rotasCartoes } from './cartoes.routes';
import { rotasItens } from './itens.routes';
import { rotasMesas } from './mesas.routes';
import { rotasPedidos } from './pedidos.routes';
import { rotasUsuarios } from './usuarios.routes';

const rotas = Router();

rotas.use('/usuarios', rotasUsuarios);
rotas.use('/itens', rotasItens);
rotas.use('/pedidos', rotasPedidos);
rotas.use('/cartoes', rotasCartoes);
rotas.use('/mesas', rotasMesas);

export { rotas };
