import { Router } from 'express';
import { AtualizarCartao } from '../../modulos/Cartoes/AtualizarCartao/AtualizarCartao';
import { BuscarTodosCartoes } from '../../modulos/Cartoes/BuscarTodosCartoes/BuscarTodosCartoes';
import { CriarCartao } from '../../modulos/Cartoes/CriarCartao/CriarCartao';
import { DeletarCartao } from '../../modulos/Cartoes/DeletarCartao/DeletarCartao';
import { autenticar } from '../middleware/autenticar';
import { validarAutenticacao } from '../middleware/validarAutenticacao';
import { validarPermissao } from '../middleware/validarPermissao';

const rotasCartoes = Router();
rotasCartoes.use(autenticar, validarAutenticacao);

rotasCartoes.post('/criar', CriarCartao, validarPermissao(['Administrador', 'Retaguarda']));
rotasCartoes.get('/', BuscarTodosCartoes);
rotasCartoes.patch('/atualizar', AtualizarCartao, validarPermissao(['Administrador', 'Retaguarda']));
rotasCartoes.delete('/deletar/:id', DeletarCartao, validarPermissao(['Administrador', 'Retaguarda']));

export { rotasCartoes };
