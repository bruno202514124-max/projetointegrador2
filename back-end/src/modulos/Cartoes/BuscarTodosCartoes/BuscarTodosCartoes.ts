import { Request, Response } from 'express';
import { tratarErro } from '../../../erros/TratarErro';
import { RepositorioCartoes } from '../Repositorio/RepositorioCartoes';

export async function BuscarTodosCartoes(req: Request, res: Response) {
  try {
    const repositorioCartoes = new RepositorioCartoes();
    const cartoes = await repositorioCartoes.buscarTodos();
    return res.json(cartoes);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
