import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { tratarErro } from '../../../erros/TratarErro';
import { RepositorioItens } from '../Repositorio/RepositorioItens';

export async function DeletarItem(req: Request, res: Response): Promise<Response> {
  try {
    const reqId = req.params.id;
    let id = '';

    if (Array.isArray(reqId)) {
      id = reqId[reqId.length - 1];
    } else {
      id = reqId;
    }

    const repositorioItens = new RepositorioItens();
    const item = await repositorioItens.pesquisarPorId(id);

    if (!item) {
      throw new EmitirMensagemErro('Item não encontrado.');
    }

    await repositorioItens.apagarItem(id);

    return res.json('Item deletado.');
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
