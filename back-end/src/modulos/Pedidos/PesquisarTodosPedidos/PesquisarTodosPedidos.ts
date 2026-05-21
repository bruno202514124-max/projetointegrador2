import { Request, Response } from 'express';
import { tratarErro } from '../../../erros/TratarErro';
import { RepositorioPedidos } from '../Repositorio/RepositorioPedidos';

export async function PesquisarTodosPedidos(req: Request, res: Response): Promise<Response> {
  const repositorioPedidos = new RepositorioPedidos();

  try {
    const pedidos = await repositorioPedidos.pesquisarTodos();
    return res.json(pedidos);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
