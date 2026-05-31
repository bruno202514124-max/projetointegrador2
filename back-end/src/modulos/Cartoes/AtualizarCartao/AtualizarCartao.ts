import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { tratarErro } from '../../../erros/TratarErro';
import { validarDados } from '../../../utils/validarDados';
import { ValidacaoId } from '../../ValidacaoId';
import { Cartao } from '../Interfaces/InterfaceCartoes';
import { RepositorioCartoes } from '../Repositorio/RepositorioCartoes';
import { ValidacaoCriarCartao } from '../Validacoes/ValidacaoCriarCartao';

export async function AtualizarCartao(req: Request, res: Response): Promise<Response> {
  try {
    const { id, numero }: Cartao = req.body;

    validarDados(ValidacaoId, { id });

    const repositorioCartoes = new RepositorioCartoes();
    const cartao = await repositorioCartoes.pesquisarPorId(id);

    if (!cartao) {
      throw new EmitirMensagemErro('Cartao não existe.', 400);
    }

    let cartaoAtualizado: Cartao | null = null;

    if (cartao) {
      let novoNumero = numero;

      if (!novoNumero) {
        novoNumero = cartao.numero;
      }

      validarDados(ValidacaoCriarCartao, { numero: novoNumero });

      cartaoAtualizado = await repositorioCartoes.atualizarCartao({
        id,
        numero: novoNumero,
      });
    }

    if (!cartaoAtualizado) {
      throw new EmitirMensagemErro('Erro ao atualizar cartão.');
    }

    return res.json(cartaoAtualizado);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
