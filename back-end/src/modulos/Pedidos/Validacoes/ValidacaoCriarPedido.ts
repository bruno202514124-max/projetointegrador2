import z from 'zod';

export const ValidacaoCriarPedido = z.object({
  idMesa: z.string('campo obrigatório.'),
  idCartao: z.string('campo obrigatório.'),
  cliente: z.string('campo obrigatório.'),
  pessoas: z
    .number('campo obrigatório.')
    .min(1, { message: 'É preciso ter ao menos 1 pessoa no pedido' }),
  itens: z
    .array(
      z.object({
        id: z.string('campo obrigatório.'),
        qtd: z.number('campo obrigatório.'),
      })
    )
    .min(1, 'O pedido precisa ter pelo menos 1 item.'),
});
