import z from 'zod';

export const ValidacaoCriarItem = z.object({
  nome: z.string({ message: 'é obrigatório.' }),
  preco: z.number({ message: 'é obrigatório.' }),
});
