import { Request, Response } from 'express';
import { RepositorioCartoes } from '../Repositorio/RepositorioCartoes';
import { validarDados } from '../../../utils/validarDados';
import { ValidacaoCriarCartao } from '../Validacoes/ValidacaoCriarCartao';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';

export async function CriarCartao(req: Request, res: Response): Promise<Response> {
  const { numero } = req.body;

  const repositorioCartoes = new RepositorioCartoes();

  try {
    validarDados(ValidacaoCriarCartao, numero);

    const cartaoAntigo = await repositorioCartoes.pesquisarPorNumero(numero);

    if (cartaoAntigo) {
      throw new EmitirMensagemErro('Já existe um cartão com esse numero.');
    }

    const novoCartao = await repositorioCartoes.criarCartao(numero);

    if (!novoCartao) {
      throw new EmitirMensagemErro('Erro ao criar cartão.');
    }

    return res.json(novoCartao);
  } catch (err) {
    return res.json(err);
  }
}
