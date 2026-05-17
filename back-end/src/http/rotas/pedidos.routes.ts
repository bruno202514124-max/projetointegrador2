import { Router } from 'express';
import { autent } from '../middleware/autent';
import { CriarPedido } from '../../modulos/Pedidos/CriarPedido/CriarPedido';

const rotasPedidos = Router();

rotasPedidos.post('/criar', autent, CriarPedido);

export { rotasPedidos };
