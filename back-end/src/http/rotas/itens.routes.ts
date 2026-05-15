import { Router } from 'express';
import { autent } from '../middleware/autent';
import { CriarItem } from '../../modulos/Itens/CriarItem/CriarItem';
import { PesquisarItens } from '../../modulos/Itens/PesquisarItens/PesquisarItens';
import { AtualizarItem } from '../../modulos/Itens/AtualizarItem/AtualizarItem';
import { DeletarItem } from '../../modulos/Itens/DeletarItem/DeletarItem';

const rotasItens = Router();

rotasItens.post('/criar', autent, CriarItem);
rotasItens.get('/', autent, PesquisarItens);
rotasItens.patch('/atualizar', autent, AtualizarItem);
rotasItens.delete('/deletar/:id', autent, DeletarItem);

export { rotasItens };
