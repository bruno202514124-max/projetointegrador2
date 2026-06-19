import { Router } from 'express';
import { AtualizarItem } from '../../modulos/Itens/AtualizarItem/AtualizarItem';
import { CriarItem } from '../../modulos/Itens/CriarItem/CriarItem';
import { DeletarItem } from '../../modulos/Itens/DeletarItem/DeletarItem';
import { BuscarTodosItens } from '../../modulos/Itens/PesquisarTodosItens/PesquisarTodosItens';
import { autenticar } from '../middleware/autenticar';
import { validarAutenticacao } from '../middleware/validarAutenticacao';
import { validarPermissao } from '../middleware/validarPermissao';

const rotasItens = Router();
rotasItens.use(autenticar, validarAutenticacao);

rotasItens.post('/criar', CriarItem, validarPermissao(['Administrador', 'Retaguarda']));
rotasItens.get('/', BuscarTodosItens);
rotasItens.patch('/atualizar', AtualizarItem, validarPermissao(['Administrador', 'Retaguarda']));
rotasItens.delete('/deletar/:id', DeletarItem, validarPermissao(['Administrador', 'Retaguarda']));

export { rotasItens };
