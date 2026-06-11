import { Request, Response } from 'express';
import { tratarErro } from '../../../erros/TratarErro';
import { RepositorioMesas } from '../Repositorio/RepositorioMesas';

export async function BuscarTodasMesas(req: Request, res: Response) {
  try {
    const repositorioMesas = new RepositorioMesas();
    const mesas = await repositorioMesas.buscarTodas();
    return res.json(mesas);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
