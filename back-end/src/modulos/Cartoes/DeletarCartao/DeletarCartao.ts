import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { tratarErro } from '../../../erros/TratarErro';
import { RepositorioCartoes } from '../Repositorio/RepositorioCartoes';

export async function DeletarCartao(req: Request, res: Response): Promise<Response> {
  try {
    const reqId = req.params.id;
    let id = '';

    if (Array.isArray(reqId)) {
      id = reqId[reqId.length - 1];
    } else {
      id = reqId;
    }

    const repositorioCartoes = new RepositorioCartoes();
    const cartao = await repositorioCartoes.pesquisarPorId(id);

    if (!cartao) {
      throw new EmitirMensagemErro('Cartao não encontrado.');
    }

    if (cartao.pedidos.some(pedido => pedido.ativo == true)) {
      throw new EmitirMensagemErro(
        'Este cartão ainda tem pedidos ativos. Finalize todos os pedidos deste cartão antes de deletar.'
      );
    }

    await repositorioCartoes.apagarCartao(id);

    return res.json('Cartao deletado.');
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
