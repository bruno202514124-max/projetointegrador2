import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { tratarErro } from '../../../erros/TratarErro';
import { validarDados } from '../../../utils/validarDados';
import { ValidacaoId } from '../../ValidacaoId';
import { Item } from '../Interfaces/InterfaceItens';
import { RepositorioItens } from '../Repositorio/RepositorioItens';
import { ValidacaoCriarItem } from '../Validacoes/ValidacaoCriarItem';

export async function AtualizarItem(req: Request, res: Response): Promise<Response> {
  try {
    const { id, nome, preco, bebida }: Item = req.body;

    validarDados(ValidacaoId, { id });

    const repositorioItens = new RepositorioItens();
    const item = await repositorioItens.pesquisarPorId(id);

    if (!item) {
      throw new EmitirMensagemErro('Item não existe.', 400);
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

      itemAtualizado = await repositorioItens.atualizarItem({
        id,
        nome: novoNome,
        preco: novoPreco,
        bebida: novaBebida,
      });
    }

    if (!itemAtualizado) {
      throw new EmitirMensagemErro('Erro ao atualizar item.');
    }

    return res.json(itemAtualizado);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
