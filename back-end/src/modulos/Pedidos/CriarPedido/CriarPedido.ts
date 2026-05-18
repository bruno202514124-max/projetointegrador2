import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { validarDados } from '../../../utils/validarDados';
import { CriarPedido } from '../Interfaces/InterfacePedido';
import { RepositorioPedidos } from '../Repositorio/RepositorioPedidos';
import { ValidacaoCriarPedido } from '../Validacoes/ValidacaoCriarPedido';

export async function CriarPedido(req: Request, res: Response): Promise<Response> {
  const { cliente, itens, idCartao, pessoas }: CriarPedido = req.body;

  const repositorioPedidos = new RepositorioPedidos();

  try {
    validarDados(ValidacaoCriarPedido, { cliente, itens, idCartao, pessoas });

    const dadosPedido: CriarPedido = {
      cliente,
      itens,
      idCartao,
      pessoas,
      // valorFinal: itens.reduce((acc, item) => {
      //   return acc + item.preco;
      // }, 0),
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
