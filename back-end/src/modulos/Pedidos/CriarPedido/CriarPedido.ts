import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { validarDados } from '../../../utils/validarDados';
import { CriarPedido, RequisicaoCriarPedido } from '../Interfaces/InterfacePedido';
import { RepositorioPedidos } from '../Repositorio/RepositorioPedidos';
import { ValidacaoCriarPedido } from '../Validacoes/ValidacaoCriarPedido';

export async function CriarPedido(req: Request, res: Response): Promise<Response> {
  const { cliente, itens, cartao }: RequisicaoCriarPedido = req.body;

  const repositorioPedidos = new RepositorioPedidos();

  try {
    validarDados(ValidacaoCriarPedido, { cliente, itens, cartao });

    const dadosPedido: CriarPedido = {
      cliente,
      valorFinal: itens.reduce((acc, item) => {
        return acc + item.preco;
      }, 0),
      itens,
    };

    const novoPedido = await repositorioPedidos.criarPedido(dadosPedido);

    if (!novoPedido) {
      throw new EmitirMensagemErro('Erro ao criar pedido.');
    }

    return res.json(novoPedido);
  } catch (err) {
    return res.json(err);
  }
}
