import { Request, Response } from 'express';
import { validarDados } from '../../../utils/validarDados';
import { ValidacaoAlterarStatus } from '../Validacoes/ValidacaoAlterarStatus';
import { RepositorioPedidos } from '../Repositorio/RepositorioPedidos';
import { RepositorioItens } from '../../Itens/Repositorio/RepositorioItens';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { tratarErro } from '../../../erros/TratarErro';

export async function AlterarStatus(req: Request, res: Response): Promise<Response> {
  try {
    const { idPedido, idItem, status } = req.body;

    validarDados(ValidacaoAlterarStatus, { idPedido, idItem, status });

    const repositorioPedidos = new RepositorioPedidos();
    const repositorioItens = new RepositorioItens();

    const pedidoAntigo = repositorioPedidos.pesquisarPorId(idPedido);

    if (!pedidoAntigo) {
      throw new EmitirMensagemErro('Pedido não existe.', 400);
    }

    const itemAntigo = repositorioItens.pesquisarPorId(idItem);

    if (!itemAntigo) {
      throw new EmitirMensagemErro('Item não existe.', 400);
    }

    const itemNoPedido = await repositorioPedidos.veificarItemNoPedido(idPedido, idItem);

    if (!itemNoPedido) {
      throw new EmitirMensagemErro('O item não está no pedido.', 400);
    }

    const itemAtualizado = await repositorioPedidos.alterarStatus(idPedido, idItem, status);
    return res.json(itemAtualizado);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
