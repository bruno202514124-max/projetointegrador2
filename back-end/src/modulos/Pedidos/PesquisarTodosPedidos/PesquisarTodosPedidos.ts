import { Request, Response } from 'express';
import { tratarErro } from '../../../erros/TratarErro';
import { RepositorioPedidos } from '../Repositorio/RepositorioPedidos';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';

export async function PesquisarTodosPedidos(req: Request, res: Response): Promise<Response> {
  try {
    const { ativo } = req.body;

    if (typeof ativo != 'boolean') {
      throw new EmitirMensagemErro('É necessário a propriedade booleana "ativo".', 400);
    }

    const repositorioPedidos = new RepositorioPedidos();
    const pedidos = await repositorioPedidos.pesquisarTodos(ativo);
    return res.json(pedidos);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
