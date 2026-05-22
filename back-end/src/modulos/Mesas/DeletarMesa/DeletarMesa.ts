import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { tratarErro } from '../../../erros/TratarErro';
import { RepositorioMesas } from '../Repositorio/RepositorioMesas';

export async function DeletarMesa(req: Request, res: Response): Promise<Response> {
  try {
    const reqId = req.params.id;
    let id = '';

    if (Array.isArray(reqId)) {
      id = reqId[reqId.length - 1];
    } else {
      id = reqId;
    }

    const repositorioMesas = new RepositorioMesas();
    const mesa = await repositorioMesas.pesquisarPorId(id);

    if (!mesa) {
      throw new EmitirMensagemErro('Mesa não encontrada.');
    }

    await repositorioMesas.apagarMesa(id);

    return res.json('Mesa deletada.');
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
