import { Router } from 'express';
import { AtualizarMesa } from '../../modulos/Mesas/AtualizarMesa/AtualizarMesa';
import { CriarMesa } from '../../modulos/Mesas/CriarMesa/CriarMesa';
import { DeletarMesa } from '../../modulos/Mesas/DeletarMesa/DeletarMesa';
import { PesquisarTodasMesas } from '../../modulos/Mesas/PesquisarTodasMesas/PesquisarTodasMesas';
import { autenticar } from '../middleware/autenticar';
import { validarAutenticacao } from '../middleware/validarAutenticacao';

const rotasMesas = Router();
rotasMesas.use(autenticar, validarAutenticacao);

rotasMesas.post('/criar', CriarMesa);
rotasMesas.get('/', PesquisarTodasMesas);
rotasMesas.patch('/atualizar', AtualizarMesa);
rotasMesas.delete('/deletar/:id', DeletarMesa);

export { rotasMesas };
