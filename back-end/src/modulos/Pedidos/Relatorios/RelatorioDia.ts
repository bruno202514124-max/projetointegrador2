import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { tratarErro } from '../../../erros/TratarErro';
import { validarDados } from '../../../utils/validarDados';
import { RepositorioPedidos } from '../Repositorio/RepositorioPedidos';
import { ValidacaoRelatorioDia } from '../Validacoes/ValidacaoRelatorioDia';

export async function RelatorioDia(req: Request, res: Response): Promise<Response> {
  try {
    const { diaDoMes, mes, ano } = req.body;

    validarDados(ValidacaoRelatorioDia, { diaDoMes, mes, ano });

    const dataInicial = new Date(ano, mes, diaDoMes);

    const dataFinal = new Date(ano, mes, diaDoMes);
    dataFinal.setHours(23, 59, 59, 999);

    const repositorioPedidos = new RepositorioPedidos();
    const relatorioDia = await repositorioPedidos.relatorio(dataInicial, dataFinal);

    if (relatorioDia?.length == 0 || relatorioDia == null) {
      throw new EmitirMensagemErro('Nenhum pedido encontrado.', 200);
    }

    const lucroDia = relatorioDia.reduce(
      (acc, pedido) =>
        acc + pedido.itens.reduce((acc2, item) => acc2 + item.valorItem * item.qtdItem, 0),
      0
    );

    const dadosRelatorioDia = {
      vendas: relatorioDia.length,
      lucro: lucroDia,
    };

    return res.json(dadosRelatorioDia);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
