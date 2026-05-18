import { Router } from 'express';
import { autent } from '../middleware/autent';
import { CriarPedido } from '../../modulos/Pedidos/CriarPedido/CriarPedido';
import { TrazerPedidos } from '../../modulos/Pedidos/TrazerPedidos/TrazerPedidos';

const rotasPedidos = Router();

rotasPedidos.post('/criar', autent, CriarPedido);
rotasPedidos.get('/', autent, TrazerPedidos);

export { rotasPedidos };
