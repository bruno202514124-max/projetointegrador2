import { Router } from 'express';
import { autent } from '../middleware/autent';
import { CriarCartao } from '../../modulos/Cartoes/CriarCartao/CriarCartao';

const rotasCartoes = Router();

rotasCartoes.post('/criar', autent, CriarCartao);

export { rotasCartoes };
