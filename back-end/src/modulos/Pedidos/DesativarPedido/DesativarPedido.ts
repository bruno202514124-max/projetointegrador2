import { Request, Response } from 'express';
import { ValidacaoId } from '../../ValidacaoId';
import { validarDados } from '../../../utils/validarDados';
import { RepositorioPedidos } from '../Repositorio/RepositorioPedidos';
import { tratarErro } from '../../../erros/TratarErro';
import { RepositorioCartoes } from '../../Cartoes/Repositorio/RepositorioCartoes';

export async function DesativarPedido(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.body;

    validarDados(ValidacaoId, { id });

    const repositorioPedidos = new RepositorioPedidos();
    const repositorioCartoes = new RepositorioCartoes();

    const pedidoDesativado = await repositorioPedidos.desativarPedido(id);

    if (pedidoDesativado?.cartaoId) {
      const cartaoLiberado = await repositorioCartoes.liberarCartaoDaMesa(pedidoDesativado?.cartaoId);
    }

    return res.json(pedidoDesativado);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
