import { Router } from 'express';
import { CriarPedido } from '../../modulos/Pedidos/CriarPedido/CriarPedido';
import { PesquisarTodosPedidos } from '../../modulos/Pedidos/PesquisarTodosPedidos/PesquisarTodosPedidos';
import { autent } from '../middleware/autent';

const rotasPedidos = Router();

rotasPedidos.post('/criar', autent, CriarPedido);
rotasPedidos.post('/', autent, PesquisarTodosPedidos);

export { rotasPedidos };
