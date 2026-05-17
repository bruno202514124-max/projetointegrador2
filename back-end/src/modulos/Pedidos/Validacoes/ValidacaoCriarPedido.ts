import z from 'zod';

export const ValidacaoCriarPedido = z.object({
  cliente: z.string({ message: 'é obrigatório.' }),
  itens: z
    .object({
      id: z.string({ message: 'é obrigatório.' }),
      preco: z.number({ message: 'é obrigatório.' }),
    })
    .array()
    .min(1),
  cartao: z.string({ message: 'é obrigatório.' }),
});
