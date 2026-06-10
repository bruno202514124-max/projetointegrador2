import { Request, Response } from 'express';
import { tratarErro } from '../../../erros/TratarErro.js';
import { RepositorioItens } from '../Repositorio/RepositorioItens.js';

export async function BuscarTodosItens(req: Request, res: Response): Promise<Response> {
  try {
    const repositorioItens = new RepositorioItens();
    const itens = await repositorioItens.buscarTodos();
    return res.json(itens);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
