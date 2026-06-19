import { Router } from 'express';
import { AtualizarMesa } from '../../modulos/Mesas/AtualizarMesa/AtualizarMesa';
import { BuscarTodasMesas } from '../../modulos/Mesas/BuscarTodasMesas/BuscarTodasMesas';
import { CriarMesa } from '../../modulos/Mesas/CriarMesa/CriarMesa';
import { DeletarMesa } from '../../modulos/Mesas/DeletarMesa/DeletarMesa';
import { autenticar } from '../middleware/autenticar';
import { validarAutenticacao } from '../middleware/validarAutenticacao';
import { validarPermissao } from '../middleware/validarPermissao';

const rotasMesas = Router();
rotasMesas.use(autenticar, validarAutenticacao);

rotasMesas.post('/criar', CriarMesa, validarPermissao(['Administrador', 'Retaguarda']));
rotasMesas.get('/', BuscarTodasMesas);
rotasMesas.patch('/atualizar', AtualizarMesa, validarPermissao(['Administrador', 'Retaguarda']));
(rotasMesas.delete('/deletar/:id', DeletarMesa), validarPermissao(['Administrador', 'Retaguarda']));

export { rotasMesas };
