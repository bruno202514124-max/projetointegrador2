import { Router } from 'express';
import { AlterarStatus } from '../../modulos/Pedidos/AlterarStatus/AlterarStatus';
import { BuscarTodosPedidos } from '../../modulos/Pedidos/BuscarTodosPedidos/BuscarTodosPedidos';
import { CriarPedido } from '../../modulos/Pedidos/CriarPedido/CriarPedido';
import { DeletarPedido } from '../../modulos/Pedidos/DeletarPedido/DeletarPedido';
import { DesativarPedido } from '../../modulos/Pedidos/DesativarPedido/DesativarPedido';
import { IncluirItem } from '../../modulos/Pedidos/IncluirItem/IncluirItem';
import { RelatorioDia } from '../../modulos/Pedidos/Relatorios/RelatorioDia';
import { RelatorioMes } from '../../modulos/Pedidos/Relatorios/RelatorioMes';
import { autenticar } from '../middleware/autenticar';
import { validarAutenticacao } from '../middleware/validarAutenticacao';

const rotasPedidos = Router();
rotasPedidos.use(autenticar, validarAutenticacao);

rotasPedidos.get('/', BuscarTodosPedidos);
rotasPedidos.post('/criar', CriarPedido);
rotasPedidos.post('/relatorioMes', RelatorioMes);
rotasPedidos.post('/relatorioDia', RelatorioDia);
rotasPedidos.post('/incluirItem', IncluirItem);
rotasPedidos.patch('/desativarPedido', DesativarPedido);
rotasPedidos.patch('/alterarStatus', AlterarStatus);
rotasPedidos.delete('/deletarPedido/:id', DeletarPedido);

export { rotasPedidos };
