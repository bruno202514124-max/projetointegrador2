import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { tratarErro } from '../../../erros/TratarErro';
import { validarDados } from '../../../utils/validarDados';
import { RepositorioCartoes } from '../../Cartoes/Repositorio/RepositorioCartoes';
import { RepositorioItens } from '../../Itens/Repositorio/RepositorioItens';
import { RepositorioMesas } from '../../Mesas/Repositorio/RepositorioMesas';
import { CriarPedido } from '../Interfaces/InterfacePedido';
import { RepositorioPedidos } from '../Repositorio/RepositorioPedidos';
import { ValidacaoCriarPedido } from '../Validacoes/ValidacaoCriarPedido';

export async function CriarPedido(req: Request, res: Response): Promise<Response> {
  try {
    const { idMesa, idCartao, cliente, pessoas, itens }: CriarPedido = req.body;

    validarDados(ValidacaoCriarPedido, { idMesa, idCartao, cliente, pessoas, itens });

    const repositorioMesas = new RepositorioMesas();
    const repositorioCartoes = new RepositorioCartoes();
    const repositorioItens = new RepositorioItens();
    const repositorioPedidos = new RepositorioPedidos();

    const mesa = await repositorioMesas.pesquisarPorId(idMesa);

    if (!mesa) {
      throw new EmitirMensagemErro('Mesa não existe.', 400);
    }

    const cartao = await repositorioCartoes.pesquisarPorId(idCartao);

    if (!cartao) {
      throw new EmitirMensagemErro('Cartão não existe.', 400);
    }

    if (cartao.mesa) {
      throw new EmitirMensagemErro(
        `Cartão ${cartao.numero} está em uso na mesa ${cartao.mesa.numero}.`,
        400
      );
    }

    async function pesquisarItem(id: string) {
      const itemAntigo = await repositorioItens.pesquisarPorId(id);

      if (!itemAntigo) {
        throw new EmitirMensagemErro('Item não existe.', 400);
      }
    }

    await Promise.all(
      itens.map(async item => {
        pesquisarItem(item.id);
      })
    );

    const dadosPedido: CriarPedido = {
      idMesa,
      idCartao,
      cliente,
      pessoas,
      itens,
    };

    const novoPedido = await repositorioPedidos.criarPedido(dadosPedido);

    if (!novoPedido) {
      throw new EmitirMensagemErro('Erro ao criar pedido.');
    }

    return res.status(201).json(novoPedido);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
