import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { validarDados } from '../../../utils/validarDados';
import { Item } from '../../Usuarios/Tipagens/TipagemItens';
import { ValidacaoCriarItem } from '../Validacoes/ValidacaoCriarItem';
import { RepositorioItens } from '../Repositorio/RepositorioItens';

export async function AtualizarItem(req: Request, res: Response): Promise<Response> {
  const { id, nome, preco, bebida }: Item = req.body;

  const repositorioItens = new RepositorioItens();

  try {
    const item = await repositorioItens.pesquisarPorId(id);

    if (!item) {
      throw new EmitirMensagemErro('Item não existe.');
    }

    let itemAtualizado: Item | null = null;

    if (item) {
      let novoNome = nome;
      let novoPreco = preco;
      let novaBebida = bebida;

      if (!novoNome) {
        novoNome = item?.nome;
      }
      if (!novoPreco) {
        novoPreco = item?.preco;
      }
      if (!novaBebida) {
        novaBebida = item?.bebida;
      }

      validarDados(ValidacaoCriarItem, { nome: novoNome, preco: novoPreco });

      itemAtualizado = await repositorioItens.atualizarItem(id, novoNome, novoPreco, novaBebida);
    }

    if (!itemAtualizado) {
      throw new EmitirMensagemErro('Item não existe.');
    }

    return res.json(itemAtualizado);
  } catch (err) {
    return res.json(err);
  }
}
