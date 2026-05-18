import z from 'zod';

export const ValidacaoCriarPedido = z.object({
  cliente: z.string({ message: 'é obrigatório.' }),
  itens: z
    .object({
      id: z.string({ message: 'é obrigatório.' }),
      qtd: z.number({ message: 'é obrigatório.' }),
    })
    .array()
    .min(1),
  idCartao: z.string({ message: 'é obrigatório.' }),
  pessoas: z.number({ message: 'é obrigatório.' }),
});
