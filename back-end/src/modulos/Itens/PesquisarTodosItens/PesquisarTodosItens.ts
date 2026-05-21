import { Request, Response } from 'express';
import { tratarErro } from '../../../erros/TratarErro.js';
import { RepositorioItens } from '../Repositorio/RepositorioItens.js';

export async function PesquisarTodosItens(req: Request, res: Response): Promise<Response> {
  const repositorioItens = new RepositorioItens();

  try {
    const itens = await repositorioItens.pesquisarTodos();
    return res.json(itens);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
