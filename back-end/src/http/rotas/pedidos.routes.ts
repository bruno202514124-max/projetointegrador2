import { Router } from 'express';
import { CriarPedido } from '../../modulos/Pedidos/CriarPedido/CriarPedido';
import { DesativarPedido } from '../../modulos/Pedidos/DesativarPedido/DesativarPedido';
import { PesquisarTodosPedidos } from '../../modulos/Pedidos/PesquisarTodosPedidos/PesquisarTodosPedidos';
import { RelatorioDia } from '../../modulos/Pedidos/Relatorios/RelatorioDia';
import { RelatorioMes } from '../../modulos/Pedidos/Relatorios/RelatorioMes';
import { autent } from '../middleware/autent';

const rotasPedidos = Router();

rotasPedidos.get('/', autent, PesquisarTodosPedidos);
rotasPedidos.post('/criar', autent, CriarPedido);
rotasPedidos.post('/relatorioMes', autent, RelatorioMes);
rotasPedidos.post('/relatorioDia', autent, RelatorioDia);
rotasPedidos.patch('/desativarPedido', autent, DesativarPedido);

export { rotasPedidos };
