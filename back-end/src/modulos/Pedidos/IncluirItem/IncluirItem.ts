import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { tratarErro } from '../../../erros/TratarErro';
import { validarDados } from '../../../utils/validarDados';
import { RepositorioItens } from '../../Itens/Repositorio/RepositorioItens';
import { ValidacaoIncluirItem } from '../../Usuarios/Validacoes/ValidacaoIncluirItem';
import { IncluirItem } from '../Interfaces/InterfacePedido';
import { RepositorioPedidos } from '../Repositorio/RepositorioPedidos';

export async function IncluirItem(req: Request, res: Response): Promise<Response> {
  try {
    const { idPedido, idItem, valorItem, qtdItem }: IncluirItem = req.body;

    validarDados(ValidacaoIncluirItem, { idPedido, idItem, valorItem, qtdItem });

    const repositorioPedidos = new RepositorioPedidos();
    const repositorioItens = new RepositorioItens();

    const pedidoAntigo = repositorioPedidos.pesquisarPorId(idPedido);

    if (!pedidoAntigo) {
      throw new EmitirMensagemErro('Pedido não existe.', 400);
    }

    const itemAntigo = repositorioItens.pesquisarPorId(idItem);

    if (!itemAntigo) {
      throw new EmitirMensagemErro('Item não existe.', 400);
    }

    const itemNoPedido = await repositorioPedidos.verificarItemNoPedido(idPedido, idItem);

    if (itemNoPedido) {
      throw new EmitirMensagemErro('O item já está no pedido.', 400);
    }

    const pedidoAtualizado = await repositorioPedidos.incluirItem({
      idPedido,
      idItem,
      valorItem,
      qtdItem,
    });

    if (!pedidoAtualizado) {
      throw new EmitirMensagemErro('Erro ao criar pedido.');
    }

    return res.status(201).json(pedidoAtualizado);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
