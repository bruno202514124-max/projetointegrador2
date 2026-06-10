import { Request, Response } from 'express';
import { tratarErro } from '../../../erros/TratarErro';
import { RepositorioPedidos } from '../Repositorio/RepositorioPedidos';

export async function BuscarTodosPedidos(req: Request, res: Response): Promise<Response> {
  try {
    const repositorioPedidos = new RepositorioPedidos();
    const pedidos = await repositorioPedidos.buscarTodos();

    if (pedidos?.length === 0) {
      return res.json('Nenhum pedido encontrado.');
    } else {
      return res.json(pedidos);
    }
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
