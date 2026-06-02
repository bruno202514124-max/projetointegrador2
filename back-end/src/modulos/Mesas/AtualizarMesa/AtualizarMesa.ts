import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { tratarErro } from '../../../erros/TratarErro';
import { validarDados } from '../../../utils/validarDados';
import { ValidacaoCriarCartao } from '../../Cartoes/Validacoes/ValidacaoCriarCartao';
import { ValidacaoId } from '../../ValidacaoId';
import { Mesa } from '../Interfaces/InterfaceMesas';
import { RepositorioMesas } from '../Repositorio/RepositorioMesas';

export async function AtualizarMesa(req: Request, res: Response): Promise<Response> {
  try {
    const { id, numero }: Mesa = req.body;

    validarDados(ValidacaoId, { id });
    validarDados(ValidacaoCriarCartao, { numero: numero });

    const repositorioMesas = new RepositorioMesas();
    const mesa = await repositorioMesas.pesquisarPorId(id);

    if (!mesa) {
      throw new EmitirMensagemErro('Mesa não existe.', 400);
    }

    let mesaAtualizada: Mesa | null = null;

    if (mesa) {
      let novoNumero = numero;

      if (!novoNumero) {
        novoNumero = mesa.numero;
      }

      validarDados(ValidacaoCriarCartao, { numero: novoNumero });

      mesaAtualizada = await repositorioMesas.atualizarMesa({
        id,
        numero: novoNumero,
      });
    }

    if (!mesaAtualizada) {
      throw new EmitirMensagemErro('Erro ao atualizar mesa.');
    }

    return res.json(mesaAtualizada);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
