import { Request, Response } from 'express';
import { RepositorioItens } from '../Repositorio/RepositorioItens.js';

export async function PesquisarTodosItens(req: Request, res: Response): Promise<Response> {
  const repositorioItens = new RepositorioItens();

  try {
    const itens = await repositorioItens.pesquisarTodos();
    return res.json(itens);
  } catch (err) {
    return res.json(err);
  }
}
