import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { tratarErro } from '../../../erros/TratarErro';
import { validarDados } from '../../../utils/validarDados';
import { RepositorioCartoes } from '../Repositorio/RepositorioCartoes';
import { ValidacaoCriarCartao } from '../Validacoes/ValidacaoCriarCartao';

export async function CriarCartao(req: Request, res: Response): Promise<Response> {
  try {
    const { numero } = req.body;

    const repositorioCartoes = new RepositorioCartoes();
    validarDados(ValidacaoCriarCartao, { numero });

    const cartaoAntigo = await repositorioCartoes.pesquisarPorNumero(numero);

    if (cartaoAntigo) {
      throw new EmitirMensagemErro('Já existe um cartão com esse numero.');
    }

    const novoCartao = await repositorioCartoes.criarCartao(numero);

    if (!novoCartao) {
      throw new EmitirMensagemErro('Erro ao criar cartão.');
    }

    return res.status(201).json(novoCartao);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
