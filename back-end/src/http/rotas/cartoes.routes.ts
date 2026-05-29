import { Router } from 'express';
import { AtualizarCartao } from '../../modulos/Cartoes/AtualizarCartao/AtualizarCartao';
import { CriarCartao } from '../../modulos/Cartoes/CriarCartao/CriarCartao';
import { PesquisarTodosCartoes } from '../../modulos/Cartoes/PesquisarTodosCartoes/PesquisarTodosCartoes';
import { autent } from '../middleware/autent';
import { DeletarCartao } from '../../modulos/Cartoes/DeletarCartao/DeletarCartao';

const rotasCartoes = Router();

rotasCartoes.post('/criar', autent, CriarCartao);
rotasCartoes.get('/', autent, PesquisarTodosCartoes);
rotasCartoes.patch('/atualizar', autent, AtualizarCartao);
rotasCartoes.delete('/deletar/:id', autent, DeletarCartao);

export { rotasCartoes };
