import { Request, Response } from 'express';
import { EmitirMensagemErro } from '../../../erros/EmitirMensagemErro';
import { tratarErro } from '../../../erros/TratarErro';
import { validarDados } from '../../../utils/validarDados';
import { RepositorioPedidos } from '../Repositorio/RepositorioPedidos';
import { ValidacaoRelatorioMes } from '../Validacoes/ValidacaoRelatorioMes';

export async function RelatorioMes(req: Request, res: Response): Promise<Response> {
  try {
    const { mes, ano } = req.body;

    validarDados(ValidacaoRelatorioMes, { mes, ano });

    const dataInicial = new Date(ano, mes, 1);

    const dataFinal = new Date(ano, mes + 1, 0);
    dataFinal.setHours(23, 59, 59, 999);

    const repositorioPedidos = new RepositorioPedidos();

    const relatorioMes = await repositorioPedidos.relatorio(dataInicial, dataFinal);

    if (relatorioMes?.length == 0 || relatorioMes == null) {
      throw new EmitirMensagemErro('Nenhum pedido encontrado.', 200);
    }

    const lucroMes = relatorioMes.reduce(
      (acc, pedido) =>
        acc + pedido.itens.reduce((acc2, item) => acc2 + item.valorItem * item.qtdItem, 0),
      0
    );

    const qtdVendas = relatorioMes.reduce(
      (acc, pedido) => acc + pedido.itens.reduce((acc2, item) => acc2 + item.qtdItem, 0),
      0
    );

    const itensMes = relatorioMes.flatMap(pedido => pedido.itens.map(item => item));
    const idsUnicos = itensMes.filter((v, i, a) => a.findIndex(({ itemId }) => v.itemId == itemId) == i);
    const listaIds = Array.from(idsUnicos.map(item => item.itemId).values());

    const rankItensMes = listaIds
      .map(id => {
        let dados = {
          id,
          qtd: 0,
          nome: '',
          preco: 0,
        };

        itensMes?.forEach(item => {
          if (item.itemId == id) {
            dados.qtd += item.qtdItem;

            if (dados.nome == '' || dados.preco == 0) {
              dados.nome = item.item.nome;
              dados.preco = item.item.preco;
            }
          }
        });

        return dados;
      })
      .sort((a, b) => b.qtd - a.qtd);

    const dadosRelatorioMes = {
      vendas: qtdVendas,
      lucro: lucroMes,
      rank: rankItensMes,
    };

    return res.json(dadosRelatorioMes);
  } catch (err) {
    const resposta = tratarErro({ res, err });
    return resposta;
  }
}
