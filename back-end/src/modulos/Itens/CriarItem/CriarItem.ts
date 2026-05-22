import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { tratarErro } from '../../../erros/TratarErro';
import { validarDados } from '../../../utils/validarDados';
import { RepositorioItens } from '../Repositorio/RepositorioItens';
import { ValidacaoCriarItem } from '../Validacoes/ValidacaoCriarItem';

export async function CriarItem(req: Request, res: Response): Promise<Response> {
  try {
    const { nome, preco, bebida } = req.body;
    const repositorioItens = new RepositorioItens();

    validarDados(ValidacaoCriarItem, { nome, preco });

    const antigoItem = await repositorioItens.pesquisarPorNome(nome);

    if (antigoItem) {
      throw new EmitirMensagemErro('Já existe um item com esse nome.');
    }

    const novoItem = await repositorioItens.criarItem({ nome, preco, bebida });

    if (!novoItem) {
      throw new EmitirMensagemErro('Erro ao criar item.');
    }

    return res.json(novoItem);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
