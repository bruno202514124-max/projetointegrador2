import { Router } from 'express';
import { CriarPedido } from '../../modulos/Pedidos/CriarPedido/CriarPedido';
import { DesativarPedido } from '../../modulos/Pedidos/DesativarPedido/DesativarPedido';
import { PesquisarTodosPedidos } from '../../modulos/Pedidos/PesquisarTodosPedidos/PesquisarTodosPedidos';
import { RelatorioDia } from '../../modulos/Pedidos/Relatorios/RelatorioDia';
import { RelatorioMes } from '../../modulos/Pedidos/Relatorios/RelatorioMes';
import { autenticar } from '../middleware/autenticar';
import { validarAutenticacao } from '../middleware/validarAutenticacao';

const rotasPedidos = Router();
rotasPedidos.use(autenticar, validarAutenticacao);

rotasPedidos.get('/', PesquisarTodosPedidos);
rotasPedidos.post('/criar', CriarPedido);
rotasPedidos.post('/relatorioMes', RelatorioMes);
rotasPedidos.post('/relatorioDia', RelatorioDia);
rotasPedidos.patch('/desativarPedido', DesativarPedido);

export { rotasPedidos };
