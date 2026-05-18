import { Request, Response } from 'express';
import { RepositorioPedidos } from '../Repositorio/RepositorioPedidos';

export async function TrazerPedidos(req: Request, res: Response): Promise<Response> {
  const repositorioPedidos = new RepositorioPedidos();

  try {
    const pedidos = await repositorioPedidos.trazerPedidos();
    return res.json(pedidos);
  } catch (err) {
    return res.json(err);
  }
}
