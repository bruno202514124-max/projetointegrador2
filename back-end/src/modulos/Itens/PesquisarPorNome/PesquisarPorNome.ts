import { Request, Response } from 'express';
import { RepositorioItens } from '../Repositorio/RepositorioItens.js';

export async function PesquisarPorNome(req: Request, res: Response): Promise<Response> {
  const { texto } = req.body;
  const repositorioItens = new RepositorioItens();

  try {
    const item = await repositorioItens.pesquisarPorNome(texto);
    return res.json(item);
  } catch (err) {
    return res.json(err);
  }
}
