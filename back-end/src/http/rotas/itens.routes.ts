import { Router } from 'express';
import { AtualizarItem } from '../../modulos/Itens/AtualizarItem/AtualizarItem';
import { CriarItem } from '../../modulos/Itens/CriarItem/CriarItem';
import { DeletarItem } from '../../modulos/Itens/DeletarItem/DeletarItem';
import { PesquisarPorNome } from '../../modulos/Itens/PesquisarPorNome/PesquisarPorNome';
import { PesquisarTodosItens } from '../../modulos/Itens/PesquisarTodosItens/PesquisarTodosItens';
import { autenticar } from '../middleware/autenticar';
import { validarAutenticacao } from '../middleware/validarAutenticacao';

const rotasItens = Router();
rotasItens.use(autenticar, validarAutenticacao);

rotasItens.post('/criar', CriarItem);
rotasItens.get('/', PesquisarTodosItens);
rotasItens.get('/pesquisar', PesquisarPorNome);
rotasItens.patch('/atualizar', AtualizarItem);
rotasItens.delete('/deletar/:id', DeletarItem);

export { rotasItens };
