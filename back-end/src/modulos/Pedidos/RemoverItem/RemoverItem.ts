import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { tratarErro } from '../../../erros/TratarErro';
import { RepositorioPedidos } from '../Repositorio/RepositorioPedidos';

export async function RemoverItem(req: Request, res: Response): Promise<Response> {
  try {
    const reqIdPedido = req.params.idPedido;
    const reqIdItem = req.params.idItem;
    let idPedido = '';
    let idItem = '';

    if (Array.isArray(reqIdPedido)) {
      idPedido = reqIdPedido[reqIdPedido.length - 1];
    } else {
      idPedido = reqIdPedido;
    }

    if (Array.isArray(reqIdItem)) {
      idItem = reqIdItem[reqIdItem.length - 1];
    } else {
      idItem = reqIdItem;
    }

    const repositorioPedidos = new RepositorioPedidos();
    const pedido = await repositorioPedidos.pesquisarPorId(idPedido);

    if (!pedido) {
      throw new EmitirMensagemErro('Pedido não encontrado.', 400);
    }

    const itemNoPedido = await repositorioPedidos.verificarItemNoPedido(idPedido, idItem);

    if (!itemNoPedido) {
      throw new EmitirMensagemErro('Item não está no pedido.', 400);
    }

    await repositorioPedidos.removerItem(idPedido, idItem);

    return res.json('Pedido deletado.');
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
