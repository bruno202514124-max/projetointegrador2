import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { tratarErro } from '../../../erros/TratarErro';
import { validarDados } from '../../../utils/validarDados';
import { ValidacaoCriarCartao } from '../../Cartoes/Validacoes/ValidacaoCriarCartao';
import { RepositorioMesas } from '../Repositorio/RepositorioMesas';

export async function CriarMesa(req: Request, res: Response): Promise<Response> {
  try {
    const { numero } = req.body;
    const repositorioMesas = new RepositorioMesas();

    validarDados(ValidacaoCriarCartao, { numero });

    const mesaAntiga = await repositorioMesas.pesquisarPorNumero(numero);

    if (mesaAntiga) {
      throw new EmitirMensagemErro('Já existe uma mesa com esse numero.');
    }

    const novaMesa = await repositorioMesas.criarMesa(numero);

    if (!novaMesa) {
      throw new EmitirMensagemErro('Erro ao criar mesa.');
    }

    return res.json(novaMesa);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
