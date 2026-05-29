import { Router } from 'express';
import { AtualizarMesa } from '../../modulos/Mesas/AtualizarMesa/AtualizarMesa';
import { CriarMesa } from '../../modulos/Mesas/CriarMesa/CriarMesa';
import { DeletarMesa } from '../../modulos/Mesas/DeletarMesa/DeletarMesa';
import { PesquisarTodasMesas } from '../../modulos/Mesas/PesquisarTodasMesas/PesquisarTodasMesas';
import { autent } from '../middleware/autent';

const rotasMesas = Router();

rotasMesas.post('/criar', autent, CriarMesa);
rotasMesas.get('/', autent, PesquisarTodasMesas);
rotasMesas.patch('/atualizar', autent, AtualizarMesa);
rotasMesas.delete('/deletar/:id', autent, DeletarMesa);

export { rotasMesas };
