import { Request, Response } from 'express';
import { RepositorioItens } from '../Repositorio/RepositorioItens';
import { ValidacaoCriarItem } from '../Validacoes/ValidacaoCriarItem';
import { validarDados } from '../../../utils/validarDados';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';

export async function CriarItem(req: Request, res: Response): Promise<Response> {
  const { nome, preco, bebida } = req.body;
  const repositorioItens = new RepositorioItens();

  try {
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
    return res.json(err);
  }
}
