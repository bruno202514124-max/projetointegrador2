import { Router } from 'express';
import { AtualizarCartao } from '../../modulos/Cartoes/AtualizarCartao/AtualizarCartao';
import { CriarCartao } from '../../modulos/Cartoes/CriarCartao/CriarCartao';
import { DeletarCartao } from '../../modulos/Cartoes/DeletarCartao/DeletarCartao';
import { PesquisarTodosCartoes } from '../../modulos/Cartoes/PesquisarTodosCartoes/PesquisarTodosCartoes';
import { autenticar } from '../middleware/autenticar';
import { validarAutenticacao } from '../middleware/validarAutenticacao';

const rotasCartoes = Router();
rotasCartoes.use(autenticar, validarAutenticacao);

rotasCartoes.post('/criar', CriarCartao);
rotasCartoes.get('/', PesquisarTodosCartoes);
rotasCartoes.patch('/atualizar', AtualizarCartao);
rotasCartoes.delete('/deletar/:id', DeletarCartao);

export { rotasCartoes };
