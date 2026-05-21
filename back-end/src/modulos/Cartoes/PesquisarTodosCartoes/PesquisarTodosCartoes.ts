import { Request, Response } from 'express';
import { tratarErro } from '../../../erros/TratarErro';
import { RepositorioCartoes } from '../Repositorio/RepositorioCartoes';

export async function PesquisarTodosCartoes(req: Request, res: Response) {
  const repositorioCartoes = new RepositorioCartoes();

  try {
    const cartoes = await repositorioCartoes.pesquisarTodos();
    return res.json(cartoes);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
