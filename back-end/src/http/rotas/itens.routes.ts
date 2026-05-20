import { Router } from 'express';
import { AtualizarItem } from '../../modulos/Itens/AtualizarItem/AtualizarItem';
import { CriarItem } from '../../modulos/Itens/CriarItem/CriarItem';
import { DeletarItem } from '../../modulos/Itens/DeletarItem/DeletarItem';
import { PesquisarPorNome } from '../../modulos/Itens/PesquisarPorNome/PesquisarPorNome';
import { PesquisarTodosItens } from '../../modulos/Itens/PesquisarTodosItens/PesquisarTodosItens';
import { autent } from '../middleware/autent';

const rotasItens = Router();

rotasItens.post('/criar', autent, CriarItem);
rotasItens.get('/', autent, PesquisarTodosItens);
rotasItens.get('/pesquisar', autent, PesquisarPorNome);
rotasItens.patch('/atualizar', autent, AtualizarItem);
rotasItens.delete('/deletar/:id', autent, DeletarItem);

export { rotasItens };
