import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { tratarErro } from '../../../erros/TratarErro';
import { RepositorioPedidos } from '../Repositorio/RepositorioPedidos';

export async function DeletarPedido(req: Request, res: Response): Promise<Response> {
  try {
    const reqId = req.params.id;
    let id = '';

    if (Array.isArray(reqId)) {
      id = reqId[reqId.length - 1];
    } else {
      id = reqId;
    }

    const repositorioPedidos = new RepositorioPedidos();
    const pedido = await repositorioPedidos.pesquisarPorId(id);

    if (!pedido) {
      throw new EmitirMensagemErro('Pedido não encontrado.');
    }

    await repositorioPedidos.apagarPedido(id);

    return res.json('Pedido deletado.');
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
