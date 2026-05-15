import { Request, Response } from 'express';
import { RepositorioItens } from '../Repositorio/RepositorioItens';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';

export async function DeletarItem(req: Request, res: Response): Promise<Response> {
  const reqId = req.params.id;
  let id = '';

  if (Array.isArray(reqId)) {
    id = reqId[reqId.length - 1];
  } else {
    id = reqId;
  }

  const repositorioItens = new RepositorioItens();

  try {
    const usuario = await repositorioItens.pesquisarPorId(id);

    if (!usuario) {
      throw new EmitirMensagemErro('Item não encontrado.');
    }

    await repositorioItens.apagarItem(id);

    return res.json('Item deletado.');
  } catch (err) {
    return res.json(err);
  }
}
