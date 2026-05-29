import { Request, Response } from 'express';
import { tratarErro } from '../../../erros/TratarErro.js';
import { RepositorioItens } from '../Repositorio/RepositorioItens.js';

export async function PesquisarPorNome(req: Request, res: Response): Promise<Response> {
  try {
    const { texto } = req.body;
    const repositorioItens = new RepositorioItens();
    const item = await repositorioItens.pesquisarPorNome(texto);
    return res.json(item);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
